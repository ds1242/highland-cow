import LoginForm from "../components/LoginForm"

function Login() {
    return (
        <div className="bg-slate-400 h-full content-start py-3 lg:py-0">
            <h1 className="flex justify-center text-4xl text-sky-900 py-2">Welcome!</h1>
            {/* <div className=""> */}
                <LoginForm />
            {/* </div> */}
        </div>
        
    )
}

export default Login;