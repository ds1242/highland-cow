
import NavBrand from "./NavBrand";
import Link from "next/link";

export default function NavLayout() {


    interface siteLinks {
        id: string
        url: string,
        linkTitle: string
    }
    const linkArr: Array<siteLinks> = [
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

    return (
        <nav className="bg-slate-700 grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2">
            <div className="grow">
                <NavBrand />
            </div>
            <div className="flex justify-center md:justify-end md:align-middle" >
                {linkArr.map(function (link) {
                    return (
                        <Link className="content-center text-sky-400 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in"
                            key={link.id}
                            href={link.url}
                        >{link.linkTitle}</Link>
                    )
                })}
            </div>
        </nav>
    );
}