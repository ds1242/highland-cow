import LoginForm from "../components/LoginForm"

function Login() {
    return (
        <div className="bg-slate-400 h-full grid grid-cols-1 grid-flow-row lg:content-evenly content-start py-3 lg:py-0">
            <h1 className="flex justify-center text-4xl text-sky-900 py-2">Welcome!</h1>
            {/* <div className=" h-auto "> */}
                <LoginForm />
            {/* </div> */}
        </div>
        
    )
}

export default Login;