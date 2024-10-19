import auth from '../assets/auth'
import Login from './Login';
import Dashboard from './Dashboard';
// import Login from './Login';


export default function Index() {

    const loggedIn = auth.loggedIn();

    return (
        <>
            {/* {!loggedIn ?

                <Login /> : 
                <Dashboard />
            } */}
        </>
    )
}