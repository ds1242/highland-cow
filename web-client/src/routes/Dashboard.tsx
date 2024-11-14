// import auth from '../assets/auth'
// import Dashboard from './Dashboard';
// import { getUserScanList } from '../assets/requestUtils';
// import { useAuth } from '../AuthProvider';
import auth from '../assets/auth';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

    return (
        <>
            <div className='flex justify-center'>
                <table className='table-auto border-collapse border border-slate-500'>
                    <thead>
                        <tr className='text-center'>
                            <th className='border border-slate-700'>Brand</th>
                            <th className='border border-slate-700'>Product Name </th>
                            <th className='border border-slate-700'>Description </th>
                            <th className='border border-slate-700'>Quantity </th>
                            <th className='border border-slate-700'>Last Time Updated</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            scanList.length ? (
                                scanList.map(product => (
                                    <tr key={product.scan_id}>
                                        <td className='border border-slate-600 bg-slate-200 '>{product.brand}</td>
                                        <td className='border border-slate-600 bg-slate-200 '>{product.product_name}</td>
                                        <td className='border border-slate-600 bg-slate-200 '>{product.description}</td>
                                        <td className='border border-slate-600 bg-slate-200 '>{product.quantity}</td>
                                        <td className='border border-slate-600 bg-slate-200 '>{product.updated_at}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5">No products</td></tr> // Adjust colSpan based on your table structure
                            )
                        }
                    </tbody>

                </table>

            </div>
        </>
    )
}
