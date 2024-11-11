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
    const [scanList, setScanList] = useState(null);
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
                setScanList("No Products Scanned Yet");
            } else {
                setScanList(result)
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
                <table className='table-auto'>
                    <thead>
                        <tr className='text-center'>
                            <th>Brand</th>
                            <th>Product Name </th>
                            <th>Description </th>
                            <th>Quantity </th>
                            <th>Last Time Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scanList.map(product => {
                            return (
                                <tr key={product.scan_id}>
                                    <td>{product.brand}</td>
                                    <td>{product.product_name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.updated_date}</td>

                                </tr>
                            )
                        })}
                    </tbody>

                </table>

            </div>
        </>
    )
}
