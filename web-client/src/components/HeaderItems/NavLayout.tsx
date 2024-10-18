import { Link } from "react-router-dom";
import NavBrand from "./NavBrand";
import AuthService from '../../assets/auth'

export default function NavLayout() {

    const logout = (event: any) => {
        event.preventDefault()
        AuthService.logout()
    }

    const loggedIn = AuthService.loggedIn();
    interface siteLinks {
        id: string
        url: string,
        linkTitle: string
    }
    const loggedOutArr: Array<siteLinks> = [
        {
            id: "0",
            url: "/login",
            linkTitle: "Login"
        },
        {
            id: "1",
            url: "/signup",
            linkTitle: "Sign Up"
        }
    ]

    const loggedInArr: Array<siteLinks> = [
        {
            id: "0",
            url: "/logout",
            linkTitle: "Log Out"
        }
    ]

    return (
        <nav className="bg-slate-700 grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2">
            <NavBrand />
            <div className="flex justify-center md:justify-end md:align-middle" >
                {!loggedIn ? loggedOutArr.map(function (link) {
                    return (
                        <Link className="content-center text-sky-400 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in" key={link.id} to={link.url}>
                            <button className="bg-slate-900 p-3">
                                {link.linkTitle}
                            </button>
                        </Link>
                    )
                }) : loggedInArr.map(function (link) {
                    return (
                        <div className="content-center text-sky-400 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in" key={link.id}>
                            <button className="bg-slate-900 p-3" onClick={logout}>
                                {link.linkTitle}
                            </button>
                        </div>
                    )
                })}
            </div>
        </nav>
    );
}