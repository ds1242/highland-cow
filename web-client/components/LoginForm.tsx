'use client'
import { useState } from "react"


export default function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            console.log(formData)
        } catch (e) {
            console.error(e)
        };
        // clear form values
        setFormData({
            email: '',
            password: ''
        });
    };


    return (
        <div className="bg-slate-600 border border-2 ">
            <form className=" grid space-y-3 p-5 m-5" onSubmit={handleFormSubmit}>
                <input
                    className=""
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Please enter your email..."
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    className=""
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Please enter your password..."
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}