import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'


function App() {

  

  return (
    <main className='bg-slate-400 h-lvh grid grid-flow-row'>
      <Header />
        <Outlet />
      <Footer />
    </main>
  )
}

export default App
