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
        <div className='grid grid-cols-6 max-w-fit'>
            {/* <div className='flex justify-center'> */}
                {/* <div className=' border border-slate-500'> */}
                    <div className='border border-slate-700 flex text-center align-middle justify-center'><p>Brand</p></div>
                    <div className='border border-slate-700 flex text-center align-middle justify-center'><p>Product Name </p></div>
                    <div className='border border-slate-700 flex text-center align-middle justify-center'><p>Description </p></div>
                    <div className='border border-slate-700 flex text-center align-middle justify-center'><p>Quantity </p></div>
                    <div className='border border-slate-700 flex text-center align-middle justify-center'><p>Last Time Updated</p></div>
                    <div className='border border-slate-700 flex text-center align-middle justify-center'><p>Add/Remove</p></div>
                {/* </div> */}
            {/* </div> */}

                {
                    scanList.length ? (
                        scanList.map(product => (
                            // <div  className='grid grid-cols-6 justify-center'>
                            <>
                                <div key={product.scan_id} className='border border-slate-600 bg-slate-200 flex align-middle justify-evenly '>{product.brand}</div>
                                <div key={product.scan_id} className='border border-slate-600 bg-slate-200 flex align-middle justify-evenly '>{product.product_name}</div>
                                <div key={product.scan_id} className='border border-slate-600 bg-slate-200 flex align-middle justify-evenly '>{product.description}</div>
                                <div key={product.scan_id} className='border border-slate-600 bg-slate-200 flex align-middle justify-evenly '>{product.quantity}</div>
                                <div key={product.scan_id} className='border border-slate-600 bg-slate-200 flex align-middle justify-evenly '>{product.updated_at}</div>
                                <div key={product.scan_id} className='border border-slate-600 bg-slate-200 flex align-middle justify-evenly'><button>+</button> <button>-</button></div>
                            </>
                            // </div>
                        ))
                    ) : (
                        <div>No products</div>
                    )
                }

        </div>
    )
}
