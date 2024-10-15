import { Link } from "react-router-dom";
import { useState } from "react";
import { authenticate } from "../assets/login";



const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // submit form
    const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        let result: { user_id: string, name: string, email:string, token: string, } = await authenticate(formData.email, formData.password)
        console.log(result)
        

        // clear form values
        setFormData({
            email: '',
            password: ''
        });
    };


    return (
        <div className="bg-slate-200 border-2 border-slate-300 rounded-xl mx-auto min-h-48 shadow-lg">
            <form className=" grid space-y-3 p-5 m-5 gap-3" onSubmit={handleFormSubmit}>
                <input
                    className="bg-slate-100 border-2 border-slate-300 text-slate-600 rounded-md p-1 shadow-inner focus:border-sky-500 focus:text-slate-600"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Please enter your email..."
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    className="bg-slate-100 border-2 border-slate-300 text-slate-600 rounded-md p-1 shadow-inner focus:border-sky-500 focus:text-slate-600"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Please enter your password..."
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit" className="mx-auto bg-slate-900 text-slate-100 w-28 h-14 rounded-md hover:bg-sky-600 shadow-md hover:shadow-slate-800">Submit</button>
                <Link to="/signup" className="text-sky-900 hover:text-sky-600">Sign Up for an Account Here!</Link>
            </form>
        </div>
    )
}

export default LoginForm;