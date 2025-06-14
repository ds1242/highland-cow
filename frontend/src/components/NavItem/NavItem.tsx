import { Link } from "react-router";

export default function NavItem () {
    return (
        <div className="flex justify-center gap-2 flex-wrap md:justify-end md:align-middle">
            <Link className="content-center text-slate-100 text-2xl md:text-2xl mx-3 hover:text-sky-100 ease-in" to="/scan">Scan</Link>
        </div>
    )
}