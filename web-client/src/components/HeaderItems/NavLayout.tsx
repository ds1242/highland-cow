import { Link } from "react-router-dom";
import NavBrand from "./NavBrand";
import { useAuth } from "../../AuthProvider";



export default function NavLayout() {
    const { loggedIn, logout } = useAuth();

    interface SiteLink {
        url: string;
        linkTitle: string;
    }

    const loggedOutArr: Array<SiteLink> = [
        {
            url: "/login",
            linkTitle: "Login"
        },
        {
            url: "/signup",
            linkTitle: "Sign Up"
        }
    ];

    const loggedInArr: Array<SiteLink> = [
        {
            url: "/logout",
            linkTitle: "Log Out"
        }
    ];

    return (
        <nav className="bg-slate-700 grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2">
            <NavBrand />
            <div className="flex justify-center md:justify-end md:align-middle">
                {loggedIn ? (
                    loggedInArr.map((link, index) => (
                        <div className="content-center text-sky-400 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in" key={index}>
                            <button className="bg-slate-900 p-3" onClick={logout}>
                                {link.linkTitle}
                            </button>
                        </div>
                    ))
                ) : (
                    loggedOutArr.map((link, index) => (
                        <Link className="content-center text-sky-400 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in" key={index} to={link.url}>
                            <button className="bg-slate-900 p-3">
                                {link.linkTitle}
                            </button>
                        </Link>
                    ))
                )}
            </div>
        </nav>
    );
}