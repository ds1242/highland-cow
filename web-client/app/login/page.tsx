import LoginForm from "@/components/LoginForm";


export default function Login() {
    return (
        <div className="grid grid-rows-3 grid-cols-6 bg-slate-400">
            <h1 className="mx-auto text-4xl text-sky-900 col-start-3 col-span-2 row-start-1">Welcome!</h1>
            <div className="mx-auto py-3 row-start-2 col-start-3 col-end-5 col-span-3">
                <LoginForm />
            </div>
        </div>
    )
}