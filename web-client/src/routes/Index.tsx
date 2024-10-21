import auth from '../assets/auth'
// import Login from './Login';
// import Dashboard from './Dashboard';
import { useAuth } from '../AuthProvider';
import { redirect, useNavigate, Link } from 'react-router-dom';
// import Login from './Login';
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';




export default function Index() {
    const navigate = useNavigate();
    const { loggedIn } = useAuth();

    const goToDash =() => {
        let user_id = auth.getId();
        navigate(`/dashboard/${user_id}`)
    }

    return (
        <>
            <div className='container mx-auto'>
                <h1 className='flex flex-row justify-center text-3xl font-semibold text-brand py-2'>The Highland Cow</h1>
                <div className='flex flow-column justify-center text-xl w-3/4 mx-auto text-brand'>Welcome to the Highland Cow!  This app is designed to allow users to scan products with the phone app and then track what and how many of an item that they have.</div>
            </div>
            <div className='flex flex-row justify-center'>
                {loggedIn ? 
                <div onClick={goToDash} className='content-center text-slate-100 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in'>
                <button className='bg-slate-900 hover:bg-sky-600 shadow-md shadow-slate-400 rounded-md p-3'>
                Dashboard
                    </button>
                </div>
                :
                <Link to="/login" className='content-center text-slate-100 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in'>
                    <button className='bg-slate-900 hover:bg-sky-600 shadow-md shadow-slate-400 rounded-md p-3'>
                        Login
                    </button>
                </Link>
                }

            </div>
        </>
    )
}