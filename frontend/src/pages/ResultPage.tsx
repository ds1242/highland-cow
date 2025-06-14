import { useParams } from "react-router"
import Header from "../components/Header"


export default function Results() {
    const { id } = useParams<{ id: string }>();

    return (
        <>
        <Header />
        <div>Scanned Code: {id}</div>
        </>
    )
}