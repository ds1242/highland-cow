import { NavLink, useNavigate } from "react-router-dom";
import NavBrand from "./NavBrand";
import { useAuth } from "../../AuthProvider";
import auth from "../../assets/auth";



export default function NavLayout() {
    const { loggedIn, logout } = useAuth();
    
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleGoToDash = () => {
        let user_id = auth.getId();
        navigate(`/dashboard/${user_id}`)
    }

    const handleGoToProfile = () => {
        let user_id = auth.getId();
        navigate(`/profile/${user_id}`)
    }

    interface SiteLink {
        url: string;
        linkTitle: string;
    }
    interface LoggedInSiteLink {
        url?: string;
        linkTitle: string;
        handleClick?: () => void | string
    }

    const loggedOutArr: Array<SiteLink> = [
        {
            url: "/login",
            linkTitle: "Login"
        },
        {
            url: "/signup",
            linkTitle: "Sign Up"
        },
    ];

    const loggedInArr: Array<LoggedInSiteLink> = [
        {
            linkTitle: "Dashboard",
            handleClick: handleGoToDash,
        },
        {
            linkTitle: "Profile",
            handleClick: handleGoToProfile,
        },
        {
            linkTitle: "Log Out",
            handleClick: handleLogout
        },

    ];

    return (
        <nav className="bg-neutral-one grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2">
            <NavBrand />
            <div className="flex justify-center gap-2 flex-wrap md:justify-end md:align-middle">
                {loggedIn ? (
                    loggedInArr.map((link, index) => (
                        <div className="content-center text-slate-100 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in" key={index}>
                            <button className="bg-slate-900 hover:bg-sky-600 shadow-md shadow-slate-400 rounded-md p-3" onClick={link.handleClick}>
                                {link.linkTitle}
                            </button>
                        </div>
                    ))
                ) : (
                    loggedOutArr.map((link, index) => (
                        <NavLink className="content-center text-slate-100 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in" key={index} to={link.url}>
                            <button className="bg-slate-900 hover:bg-sky-600 shadow-md shadow-slate-400 rounded-md p-3">
                                {link.linkTitle}
                            </button>
                        </NavLink>
                    ))
                )}
            </div>
        </nav>
    );
}