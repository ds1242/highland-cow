import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'


function App() {



  return (
    <main className='bg-neutral-two flex flex-col min-h-screen'>
      <Header />
        <Outlet />
      <Footer />
    </main>
  )
}

export default App
