import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../assets/requestUtils";
import { useAuth } from "../AuthProvider";



function SignUp() {

    const navigate = useNavigate();
    const {login } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
        setErrorMessage('');
    }
    const handleSignUpSubmit = async (event: any) => {
        event.preventDefault();
        try {
            let result: any = await signup(formData.name, formData.email, formData.password)

            if (result.error) {
                setErrorMessage(result.error);
            }
            setFormData({
                name: '',
                email: '', 
                password: '',
            });
            setErrorMessage('');
            
            login(result.token)
            navigate(`/dashboard/${result.user_id}`)

        } catch (error:any) {
            if (error.message == 'Response status: 500') {
                setErrorMessage("User already exists")
            }
        }
    }

    return (
        <div className="bg-slate-400 h-full content-start py-3 lg:py-0">
            <h1 className="flex justify-center text-4xl text-sky-900 py-2">Welcome!</h1>
            <div className="flex justify-center text-sky-900 py-2">Please enter your email and password to signup!</div>
            <div className="bg-slate-200 border-2 border-slate-300 rounded-xl mx-auto min-h-48 max-w-80 shadow-lg m-3">
                <form className=" grid space-y-3 p-5 mt-5 mx-5 gap-3" onSubmit={handleSignUpSubmit}>
                    <input
                        className="bg-slate-100 border-2 border-slate-300 text-slate-600 rounded-md p-1 shadow-inner focus:border-sky-500 focus:text-slate-600 focus:outline-none"
                        id="name"
                        type="name"
                        name="name"
                        placeholder="Please enter your name..."
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        className="bg-slate-100 border-2 border-slate-300 text-slate-600 rounded-md p-1 shadow-inner focus:border-sky-500 focus:text-slate-600 focus:outline-none"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Please enter your email..."
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className="bg-slate-100 border-2 border-slate-300 text-slate-600 rounded-md p-1 shadow-inner focus:border-sky-500 focus:text-slate-600 focus:outline-none"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Please enter your password..."
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="mx-auto bg-slate-900 text-slate-100 w-28 h-14 rounded-md hover:bg-sky-600 shadow-md shadow-slate-400 hover:shadow-slate-800">Submit</button>
                    <Link to="/login" className="text-sm text-center text-sky-900 hover:text-sky-600">Already have a account, login here!</Link>
                </form>
                {errorMessage && <div className="flex flex-row justify-center pb-3 text-red-500 italic"> {errorMessage} </div>}
            </div>
        </div>

    )
}

export default SignUp;