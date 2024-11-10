// import auth from '../assets/auth'
// import Dashboard from './Dashboard';
import { getUserScanList } from '../assets/requestUtils';
import { useAuth } from '../AuthProvider';
import auth from '../assets/auth';
import { useEffect, useState } from 'react';
// import { redirect, useNavigate } from 'react-router-dom';
// import Login from './Login';
// import { useState, useEffect } from 'react';

const domain = "https://localhost:8443"
const version = "/v1"

export default function Dashboard() {
    //const navigate = useNavigate();
    const { loggedIn } = useAuth();
    const userToken = auth.getId();
    const [scanList, setScanList] = useState();

    console.log(scanList);

    const fetchData = async () => {

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
            setScanList(result)
        } catch (error: any) {
            throw error;
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        // <>
        // {!loggedIn ? redirect(`/login`) : ""}
        <h1>logged in dashboard</h1>
        // </>
    )
}
