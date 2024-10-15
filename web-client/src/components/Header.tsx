import HeaderWave from "./HeaderItems/HeaderWave";
import NavLayout from "./HeaderItems/NavLayout";


export default function Header() {
    return (
        <div className="bg-slate-400">
            <NavLayout />
            <HeaderWave />
        </div>
    )
}