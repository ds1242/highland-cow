import NavBrand from "../NavItem/NavBrand";
import NavItem from "../NavItem/NavItem";

export default function Header () {
    return (
        <div className="bg-neutral-one grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2">
            <NavBrand />
            <NavItem />
        </div>
    )
}