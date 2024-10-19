import auth from '../assets/auth'
import Login from './Login';


export default function Index() {

    const loggedIn = auth.loggedIn();
    // if(!loggedIn) {

    //     return redirect('/login')
    // }


    return (
        
        <h1>Welcome!</h1>
    )
}