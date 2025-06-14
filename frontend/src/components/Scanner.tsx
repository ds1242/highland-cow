// BarcodeScanner.tsx
import React, { useEffect, useRef, useState } from 'react';
import Quagga from '@ericblade/quagga2';

const Scanner: React.FC = () => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: {
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['upc_reader', 'ean_reader'],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error('Quagga initialization failed:', err);
          return;
        }
        Quagga.start();
      }
    );

    const handleDetected = (data: Quagga.QuaggaJSResultObject) => {
      const code = data?.codeResult?.code;
      if (code) {
        setScannedCode(code);
        console.log('Detected code:', code);
        Quagga.stop(); // Stop after first successful scan
      }
    };

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        ref={scannerRef}
        style={{
          width: '100%',
          maxWidth: '600px',
          margin: 'auto',
          border: '2px solid black',
        }}
      />
      <div style={{ marginTop: '1rem', fontSize: '1.2em' }}>
        {scannedCode ? `Scanned Code: ${scannedCode}` : 'Scanning...'}
      </div>
    </div>
  );
};

export default Scanner;
