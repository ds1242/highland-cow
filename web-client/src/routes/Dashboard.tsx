// import auth from '../assets/auth'
// import Dashboard from './Dashboard';
import { getUserScanList } from '../assets/requestUtils';
import { useAuth } from '../AuthProvider';
import auth from '../assets/auth';
import { useEffect, useState } from 'react';
// import { redirect, useNavigate } from 'react-router-dom';
// import Login from './Login';
// import { useState, useEffect } from 'react';

export default function Dashboard() {
    //const navigate = useNavigate();
    const { loggedIn } = useAuth();
    const userToken = auth.getId();
    const [scanList, setScanList] = useState();

    console.log(scanList);

    useEffect(() => {

        const userScanList = getUserScanList(userToken);
        setScanList(userScanList);
    }, []);

    return (
        // <>
        // {!loggedIn ? redirect(`/login`) : ""}
        <h1>logged in dashboard</h1>
        // </>
    )
}
