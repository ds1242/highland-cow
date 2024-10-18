import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import auth from './assets/auth'
import LoginForm from './components/LoginForm'

function App() {

  const loggedIn = auth.loggedIn();

  return (
    <main className='bg-slate-400 h-lvh grid grid-flow-row'>
      <Header />
      {loggedIn ?
        <Outlet />
        :
        <LoginForm />
      }
      <Footer />
    </main>
  )
}

export default App
