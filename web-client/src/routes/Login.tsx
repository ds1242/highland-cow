import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../assets/requestUtils";
import { useState } from "react";
import { useAuth } from "../AuthProvider";


function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
        setErrorMessage('');
    };

    // submit form
    const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        try {

            let result: any = await authenticate(formData.email, formData.password)

            if (result.error) {
                setErrorMessage(result.error);
            }
            setFormData({
                email: '',
                password: ''
            });
            setErrorMessage('');

            login(result.token)

            navigate(`/dashboard/${result.user_id}`)

        } catch (error: any) {
            console.error(error)
            if (error.message == 'Response status: 400') {
                setErrorMessage("User does not exists")
            }
            if (error.message == 'Response status: 403') {
                setErrorMessage('Unable to log in')
            }
        }
    };
    return (
        <div className="bg-neutral-two h-full content-start py-3 lg:py-0">
            <h1 className="flex justify-center text-4xl text-brand py-2">Welcome!</h1>
            <div className="bg-slate-200 border-2 border-slate-300 rounded-xl mx-auto min-h-48 max-w-80 shadow-lg m-3">
                <form className=" grid space-y-3 p-5 mt-5 mx-5 gap-3" onSubmit={handleFormSubmit}>
                    <input
                        className="bg-slate-100 border-2 border-slate-300 text-slate-600 rounded-md p-1 shadow-inner focus:border-brand focus:text-slate-600 focus:outline-none"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Please enter your email..."
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className="bg-slate-100 border-2 border-slate-300 text-slate-600 rounded-md p-1 shadow-inner focus:border-brand focus:text-slate-600 focus:outline-none"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Please enter your password..."
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="mx-auto bg-slate-900 text-slate-100 w-28 h-14 rounded-md hover:bg-sky-600 shadow-md shadow-slate-400 hover:shadow-slate-800">Submit</button>
                    <Link to="/signup" className="text-sm text-center text-sky-900 hover:text-sky-600">Sign Up for an Account Here!</Link>
                </form>
                {errorMessage && <div className="flex flex-row justify-center pb-3 text-red-500 italic"> {errorMessage} </div>}
            </div>
        </div>

    )
}

export default Login;