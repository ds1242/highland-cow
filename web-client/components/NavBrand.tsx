import Image from "next/image";
import Link from "next/link";
import brand from "../public/brand_cow.jpg"

export default function NavBrand({ site_title }) {
    return (
        <div className="flex flex-row content-center">
            <Image
                src={brand}
                width={100}
                height={100}
                alt="brand image"
                className="rounded-full p-2"

            />
            <Link
                href="/"
                className="flex flex-row"
            >
                <h1 className="content-center p-2 text-3xl text-sky-500 hover:text-sky-700 ease-in">
                    { site_title }
                </h1>
            </Link>
        </div>
    )
}