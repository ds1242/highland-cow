
import NavBrand from "./NavBrand";
import Link from "next/link";

export default function NavLayout() {
    return (
        <nav className="container flex flex-row">
            <NavBrand />
            <div className="grow"></div>
            <Link href="/Login">Login</Link>
            <Link href="/Login">Sign Up</Link>
        </nav>
    );
}