
import NavBrand from "./NavBrand";
import Link from "next/link";

export default function NavLayout() {

    const siteName: string = "The Highland Cow"
    interface siteLinks {
        url: string,
        linkTitle: string
    }


    return (
        <nav className="container flex flex-row">
            <NavBrand site_title={siteName} />
            <div className="grow"></div>
            <Link href="/Login">Login</Link>
            <Link href="/Login">Sign Up</Link>
        </nav>
    );
}