import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';

const Scanner: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const readerRef = useRef<BrowserMultiFormatReader | null>(null);
    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(false);
    
    const navigate = useNavigate();

    const startScanning = async () => {
        try {
            setError(null);
            console.log('Starting scanner...');
            
            // Create a simple reader
            const codeReader = new BrowserMultiFormatReader();
            readerRef.current = codeReader;
            
            // Start decoding from the video element
            const result = await codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current!);
            
            if (result) {
                const code = result.getText();
                const format = result.getBarcodeFormat();
                console.log('Scanned code:', code, 'Format:', BarcodeFormat[format]);
                
                // Basic validation for product barcodes
                if (code.length >= 8 && /^\d+$/.test(code)) {
                    setScannedCode(code);
                    setIsActive(false);
                } else {
                    // If invalid, try again
                    setTimeout(startScanning, 1000);
                }
            }
        } catch (err: any) {
            console.error('Scanning error:', err);
            
            if (err.name === 'NotAllowedError') {
                setError('Camera permission denied. Please allow camera access.');
            } else if (err.name === 'NotFoundError') {
                setError('No camera found on this device.');
            } else if (err.name === 'NotFoundException') {
                // No barcode found, try again
                if (isActive) {
                    setTimeout(startScanning, 1000);
                }
            } else {
                setError(`Camera error: ${err.message || 'Unknown error'}`);
            }
        }
    };

    const stopScanning = () => {
        console.log('Stopping scanner...');
        setIsActive(false);
        
        if (readerRef.current) {
            readerRef.current.reset();
            readerRef.current = null;
        }
    };

    const handleStart = () => {
        setIsActive(true);
        setError(null);
        setScannedCode(null);
        startScanning();
    };

    const handleStop = () => {
        stopScanning();
    };

    // Navigate when code is scanned
    useEffect(() => {
        if (scannedCode) {
            console.log('Navigating to results...');
            setTimeout(() => {
                navigate(`/results/${scannedCode}`);
            }, 1000);
        }
    }, [scannedCode, navigate]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopScanning();
        };
    }, []);

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">
                Wine & Liquor Scanner
            </h1>
            
            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <video
                    ref={videoRef}
                    className="w-full h-64 object-cover"
                    playsInline
                    muted
                    autoPlay
                />
                
                {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className="text-white text-center">
                            <div className="text-lg mb-2">📱</div>
                            <div>Ready to scan</div>
                        </div>
                    </div>
                )}
                
                {isActive && (
                    <div className="absolute inset-0 border-2 border-green-500 pointer-events-none">
                        <div className="absolute top-4 left-4 right-4 text-white text-center text-sm bg-black bg-opacity-50 p-2 rounded">
                            Point camera at barcode
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {scannedCode && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <div className="font-bold">✓ Scanned Successfully!</div>
                    <div>Code: {scannedCode}</div>
                    <div className="text-sm">Redirecting...</div>
                </div>
            )}

            <div className="flex gap-2 justify-center">
                {!isActive ? (
                    <button
                        onClick={handleStart}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
                        disabled={!!scannedCode}
                    >
                        Start Scanning
                    </button>
                ) : (
                    <button
                        onClick={handleStop}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
                    >
                        Stop Scanning
                    </button>
                )}
            </div>

            <div className="text-center mt-4 text-sm text-gray-600">
                <div>Supports UPC, EAN, and Code 128 barcodes</div>
                <div>Perfect for wine and liquor bottles</div>
            </div>
        </div>
    );
};

export default Scanner;