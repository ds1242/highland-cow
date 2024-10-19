import { Link, useNavigate } from "react-router-dom";
import NavBrand from "./NavBrand";
import { useAuth } from "../../AuthProvider";



export default function NavLayout() {
    const { loggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
        <nav className="bg-neutral-one grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2">
            <NavBrand />
            <div className="flex justify-center md:justify-end md:align-middle">
                {loggedIn ? (
                    loggedInArr.map((link, index) => (
                        <div className="content-center text-slate-100 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in" key={index}>
                            <button className="bg-slate-900 hover:bg-sky-600 shadow-md shadow-slate-400 rounded-md p-3" onClick={handleLogout}>
                                {link.linkTitle}
                            </button>
                        </div>
                    ))
                ) : (
                    loggedOutArr.map((link, index) => (
                        <Link className="content-center text-slate-100 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in" key={index} to={link.url}>
                            <button className="bg-slate-900 hover:bg-sky-600 shadow-md shadow-slate-400 rounded-md p-3">
                                {link.linkTitle}
                            </button>
                        </Link>
                    ))
                )}
            </div>
        </nav>
    );
}