import { useEffect, useState } from "react"
import auth from "../assets/auth";
import { useAuth } from "../AuthProvider";

const domain = "https://localhost:8443"
const version = "/v1"


export default function Profile() {
    const { loggedIn } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = `${domain}${version}/users`;
    const token = auth.getToken();

    const fetchData = async () => {

        setLoading(true);
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("Network error retrieving user data")
            }
            const result = await response.json();
            setData(result)

        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div> Loading.... </div>
        )
    }

    if (error) {
        return (
            <div>Error: {error.message} </div>
        )
    }

    if (!loggedIn) { }
    console.log(data)
    return (
        <div>
            <h1>Welcome {data?.name} </h1>
        </div>

    )
}
