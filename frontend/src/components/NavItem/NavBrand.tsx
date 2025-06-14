import { Link } from "react-router"
import brand from "/public/brand_cow.jpg";

export default function NavBrand() {
    
    return (
        <div className="flex flex-row content-center justify-center md:justify-normal">
            <img
                src={brand}
                width={100}
                height={100}
                alt="brand image"
                className="rounded-full p-2"
            />
            <Link to="/" className="content-center">
                <h1 className="content-center p-2 text-3xl font-semibold lg:text-3xl text-brand hover:text-sky-600 ease-in">
                    The Highland Cow
                </h1>
            </Link>
        </div>
    )
}