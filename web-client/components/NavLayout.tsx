
import NavBrand from "./NavBrand";
import Link from "next/link";

export default function NavLayout() {


    interface siteLinks {
        id: string
        url: string,
        linkTitle: string
    }
    let linkArr: Array<siteLinks> = [
        {
            id: "0",
            url: "/login",
            linkTitle: "Login"
        },
        {
            id: "1",
            url: "/sign-up",
            linkTitle: "Sign Up"
        }
    ]

    return (
        <nav className="grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-2">
            <div className="grow">
                <NavBrand />
            </div>
            <div className="flex justify-center md:justify-end md:align-middle" >
                {linkArr.map(function (link) {
                    return (
                        <Link className="content-center text-sky-500 text-xl mx-3 hover:text-sky-100 ease-in" key={link.id} href={link.url}>{link.linkTitle}</Link>
                    )
                })}
            </div>
        </nav>
    );
}