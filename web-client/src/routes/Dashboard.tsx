// import auth from '../assets/auth'
// import Dashboard from './Dashboard';
// import { useAuth } from '../AuthProvider';
// import { redirect, useNavigate } from 'react-router-dom';
// import Login from './Login';
// import { useState, useEffect } from 'react';

export default function Dashboard() {
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
        // <>
        // {!loggedIn ? redirect(`/login`) : ""}
        <h1>logged in dashboard</h1>
        // </>
    )
}