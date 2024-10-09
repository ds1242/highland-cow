import Image from "next/image";
import Link from "next/link";
import brand from "@/public/brand_cow.jpg"

export default function NavBrand() {
    return (
        <div className="flex flex-row content-center justify-center md:justify-normal">
            <Image
                src={brand}
                width={100}
                height={100}
                alt="brand image"
                className="rounded-full p-2"

            />
            <Link
                href="/"
                className="content-center"
            >
                <h1 className="content-center p-2 text-2xl lg:text-3xl text-sky-500 hover:text-sky-100 ease-in">
                    The Highland Cow
                </h1>
            </Link>
        </div>
    )
}