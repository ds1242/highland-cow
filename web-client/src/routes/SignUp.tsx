import Header from "../components/Header";
import Footer from "../components/Footer";
import SignUpForm from "../components/SignUpForm";

function SignUp() {
    return (
        <main className='bg-slate-400 h-lvh grid grid-flow-row'>
            <Header />
            <div className="bg-slate-400 h-full content-start py-3 lg:py-0">
                <h1 className="flex justify-center text-4xl text-sky-900 py-2">Welcome!</h1>
                <SignUpForm />
            </div>
            <Footer />
        </main>

    )
}

export default SignUp;