import Image from "next/image";
import brand  from "../public/brand_cow.jpg"

export default function NavLayout() {
    return(
        <nav className="container">
            <Image
                src={brand}
                width={50}
                height={50}
                alt="brand image"
                className=""
            />
        </nav>
    );
}