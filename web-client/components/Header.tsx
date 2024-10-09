import HeaderWave from "./HeaderWave";
import NavLayout from "./NavLayout";


export default function Header() {
    return (
        <div className="bg-slate-400">
            <NavLayout />
            <HeaderWave />
        </div>
    )
}