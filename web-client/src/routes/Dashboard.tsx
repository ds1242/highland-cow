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

    const addOnClick = (e:any, scan_id:string) => {
        e.preventDefault();
        console.log('click ' + scan_id)
    }

    const subtractOnClick = (e: any, scan_id:string) => {
        e.preventDefault();
        console.log('subtract ' + scan_id);
    }

    return (
        <div className='flex justify-center py-5 my-5 h-full'>

            <div className='   overflow-x-auto'>

                <table className='border border-collapse'>
                    <thead className=''>
                        <tr className=''>
                            <th className='border border-slate-700 '><p>Brand</p></th>
                            <th className='border border-slate-700 '><p>Product Name </p></th>
                            <th className='border border-slate-700 '><p>Description </p></th>
                            <th className='border border-slate-700 '><p>Quantity </p></th>
                            <th className='border border-slate-700 '><p>Last Time Updated</p></th>
                            <th className='border border-slate-700 '><p>Add/Remove</p></th>
                        </tr>
                    </thead>

                    <tbody className=''>
                        {
                            scanList.length ? (
                                scanList.map(product => (
                                    <tr className='' key={product.scan_id}>
                                        <td className='border border-slate-600 bg-slate-200 px-3 text-center '>{product.brand}</td>
                                        <td className='border border-slate-600 bg-slate-200 px-3 text-center '>{product.product_name}</td>
                                        <td className='border border-slate-600 bg-slate-200 px-3 text-center '>{product.description}</td>
                                        <td className='border border-slate-600 bg-slate-200 px-3 text-center '>{product.quantity}</td>
                                        <td className='border border-slate-600 bg-slate-200 px-3 text-center '>{product.updated_at}</td>
                                        <td className='border border-slate-600 bg-slate-200 px-3 text-center'>
                                            <button className='px-2 mx-2' onClick={(event) => addOnClick(event, product.scan_id)}>
                                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 12 7Z" fill="#222F3D" />
                                                </svg>
                                            </button>
                                            <button className='px-2 mx-2' onClick={(event) => subtractOnClick(event, product.scan_id)}>
                                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm4.25 7.75a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5h8.5Z" fill="#222F3D" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <div>No products</div>
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}
