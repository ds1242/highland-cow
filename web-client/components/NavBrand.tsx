import Image from "next/image";
import Link from "next/link";
import brand from "../public/brand_cow.jpg"

export default function NavBrand() {
    return (
        <Link
            href="/"
            className="flex flex-row content-center"
        >
            <Image
                src={brand}
                width={100}
                height={100}
                alt="brand image"
                className="rounded-full p-2 hover:border-solid hover:border-2 hover:border-sky-200 ease-in-out"

            />
            <h1 className="content-center p-2 text-3xl text-sky-500 hover:text-sky-700 ease-in">
                The Highland Cow
            </h1>
        </Link>
    )
}