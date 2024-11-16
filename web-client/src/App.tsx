import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'


function App() {



  return (
    <main className='bg-neutral-two'>
      <Header />
      <div className='min-h-96'>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default App
