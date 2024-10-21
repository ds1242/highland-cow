import auth from '../assets/auth'
// import Login from './Login';
// import Dashboard from './Dashboard';
import { useAuth } from '../AuthProvider';
import { redirect, useNavigate, Link } from 'react-router-dom';
// import Login from './Login';
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';




export default function Index() {
    // const navigate = useNavigate();
    // const loggedIn = useAuth();
    // const [userId, setUserId] = useState<string | null>(null);

    // useEffect(() => {
    //     if (loggedIn) {
    //         const id = auth.getId(); // Get the user ID from the token
    //         setUserId(id); // Set userId state
    //     } else {
    //         setUserId(null); // Reset userId if not logged in
    //     }
    // }, [loggedIn]);

    return (
        <>
            <div className='grid grid-rows-2'>
                <Link to="/dashboard" className='content-center text-slate-100 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in'>
                    <button className='bg-slate-900 hover:bg-sky-600 shadow-md shadow-slate-400 rounded-md p-3'>
                        Dashboard
                    </button>
                </Link>
                <Link to="/login" className='content-center text-slate-100 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in'>
                    <button className='bg-slate-900 hover:bg-sky-600 shadow-md shadow-slate-400 rounded-md p-3'>
                        Login
                    </button>
                </Link>

            </div>
        </>
    )
}