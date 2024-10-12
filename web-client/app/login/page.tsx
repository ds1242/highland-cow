import LoginForm from "@/components/LoginForm";


export default function Login() {
    return (
        <div className="bg-slate-400">
            <h1 className="flex justify-center mx-auto text-4xl text-sky-900">Welcome!</h1>
            <div className="mx-auto">
                <LoginForm />
            </div>
        </div>
    )
}