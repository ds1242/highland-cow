import Header from './components/Header'
import './App.css'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <main className=''>
      <Header />
      <div className="grid grid-cols-1 bg-slate-400">
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default App
