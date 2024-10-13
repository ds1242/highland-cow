'use client'
import { useState } from "react"
import Link from "next/link";
import { authenticate } from "@/public/login";


export default function LoginForm() {
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

        // let token:any = authenticate(formData.email, formData.password)
        // console.log(token)
        const url = "http://localhost:8080/v1/login"
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json()
            console.log(result)
            // return result
        } catch (error: any) {
            console.error(error.message)
        }

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
                <Link href="/signup" className="text-sky-900 hover:text-sky-600">Sign Up for an Account Here!</Link>
            </form>
        </div>
    )
}