import { useEffect, useState } from "react"
import auth from "../assets/auth";
import { updateUser } from "../assets/requestUtils";

const domain = "https://localhost:8443"
const version = "/v1"


export default function Profile() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
        setErrorMessage('');

    }

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


    const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        try {

            let result: any = await updateUser(token, formData.name, formData.email, formData.password)

            if (result.error) {
                setErrorMessage(result.error);
            }
            setFormData({
                email: '',
                password: '',
                name: '',
            });
            setErrorMessage('');



        } catch (error: any) {
            console.error(error)
            if (error.message == 'Response status: 400') {
                setErrorMessage("User does not exists")
            }
            if (error.message == 'Response status: 403') {
                setErrorMessage('Unable to log in')
            }
        }
    }

    return (

        <div className="bg-neutral-two h-full content-start py-3 lg:py-0">
            <h1 className="flex justify-center text-4xl text-brand py-2">Welcome {data?.name}!</h1>
            <p className="flex justify-center text-brand py-1 px-1">If you would like to update any of your information please use the fields below</p>
            <div className="bg-slate-200 border-2 border-slate-300 rounded-xl mx-auto min-h-48 max-w-80 shadow-lg m-3">
                <form className=" grid space-y-3 p-5 mt-5 mx-5 gap-3" onSubmit={handleFormSubmit}>
                    <label className="text-brand">
                        Name:
                        <input
                            className="bg-slate-100 border-2 border-slate-300 text-slate-600 rounded-md p-1 shadow-inner focus:border-brand focus:text-slate-600 focus:outline-none"
                            id="name"
                            type="name"
                            name="name"
                            placeholder="Please update your name..."
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="text-brand">
                        Email:
                        <input
                            className="bg-slate-100 border-2 border-slate-300 text-slate-600 rounded-md p-1 shadow-inner focus:border-brand focus:text-slate-600 focus:outline-none"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Please enter your email..."
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Passsword
                        <input
                            className="bg-slate-100 border-2 border-slate-300 text-slate-600 rounded-md p-1 shadow-inner focus:border-brand focus:text-slate-600 focus:outline-none"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Please enter your password..."
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" className="mx-auto bg-slate-900 text-slate-100 w-28 h-14 rounded-md hover:bg-sky-600 shadow-md shadow-slate-400 hover:shadow-slate-800">Submit</button>
                </form>
                {errorMessage && <div className="flex flex-row justify-center pb-3 text-red-500 italic"> {errorMessage} </div>}
            </div>
        </div>

    )
}
