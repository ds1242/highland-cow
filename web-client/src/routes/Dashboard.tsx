import { updateScanQuantity, deleteScan } from '../assets/requestUtils';
import auth from '../assets/auth';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
// import Login from './Login';

const domain = "https://localhost:8443"
const version = "/v1"

export default function Dashboard() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const tokenUserId = auth.getId();


    const userToken = auth.getToken();
    const [scanList, setScanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true)
        const url = `${domain}${version}/user_scans`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json()
            if (result == null) {
                setScanList([]);
                // return "No products scanned yet";
            } else {
                setScanList(result)
                // return result;
            }
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (tokenUserId != userId) {
            navigate(`dashboard/${tokenUserId}`);
        }
        if (userId === null) {
            navigate(`/login`)
        }
        fetchData();
    }, []);

    console.log(scanList);


    if (loading) {
        return (
            <div> Loading.... </div>
        )
    }

    if (error) {
        return (
            <div>Error: {error.message} </div>
        )
    }

    const addOnClick = async (e:any, scan_id:string, quantity: number) => {
        e.preventDefault();
        let token:string = auth.getToken();
        let newQuantity = quantity + 1;
        let quantityUpdate = await updateScanQuantity(scan_id, newQuantity, token);
        if (quantityUpdate == true) {
            fetchData();
        } else {
            setError(error.message("Error updating quantity"))
        }

    }

    const subtractOnClick = async (e: any, scan_id:string, quantity: number) => {
        e.preventDefault();
        let token:string = auth.getToken();
        console.log('subtract ' + scan_id + ' ' + quantity);
        let newQuantity = quantity - 1;
        if (newQuantity <= 0) {
            await deleteScan(scan_id, token);
            fetchData();
        } else {
            let quantityUpdate = await updateScanQuantity(scan_id, newQuantity, token);
            if (quantityUpdate == true) {
                fetchData();
            } else {
                setError(error.message("Error Updating Quantity"))
            }
        }
    }

    return (
        <div className=' flex justify-center py-5 my-5 h-full'>
            <div className='overflow-x-auto'>
                <Table className=''>
                    <TableCaption>List of your scanned items</TableCaption>
                    <TableHeader className='bg-slate-50 rounded-t-lg'>
                        <TableRow className=''>
                            <TableHead className=''><p>Brand</p></TableHead>
                            <TableHead className=''><p>Product Name </p></TableHead>
                            <TableHead className=''><p>Description </p></TableHead>
                            <TableHead className=''><p>Quantity </p></TableHead>
                            <TableHead className=''><p>Last Time Updated</p></TableHead>
                            <TableHead className=''><p>Add/Remove</p></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className=''>
                        {
                            scanList.length ? (
                                scanList.map(product => (
                                    <TableRow className='h-14' key={product.scan_id}>
                                        <TableCell className=''>{product.brand}</TableCell>
                                        <TableCell className=''>{product.product_name}</TableCell>
                                        <TableCell className=''>{product.description}</TableCell>
                                        <TableCell className=''>{product.quantity}</TableCell>
                                        <TableCell className=''>{product.updated_at}</TableCell>
                                        <TableCell className=''>
                                            <button className='px-2 transition ease-out hover:ease-in hover:scale-110 duration-150' onClick={(event) => addOnClick(event, product.scan_id, product.quantity)}>
                                                <svg width="24" height="24" className='fill-[#222F3D] hover:fill-red-400' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 12 7Z"/>
                                                </svg>
                                            </button>
                                            <button className='px-2 transition ease-out hover:ease-in hover:scale-110 duration-150' onClick={(event) => subtractOnClick(event, product.scan_id, product.quantity)}>
                                                <svg width="24" height="24" className='fill-[#222F3D] hover:fill-red-400' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm4.25 7.75a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5h8.5Z" />
                                                </svg>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <div>No products</div>
                            )
                        }
                    </TableBody>

                </Table>
            </div>
            {error && <div className="flex flex-row justify-center pb-3 text-red-500 italic"> {error} </div>}
        </div>
    )
}
