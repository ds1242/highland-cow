import Header from "../components/Header"
import Scanner from "../components/Scanner"

export default function ScanPage() {
    return (
        <>
            <Header />
            <div className="flex justify-center">
                <Scanner />
            </div>
        </>
    )
}