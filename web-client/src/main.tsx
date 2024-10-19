import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Login from './routes/Login.tsx'
import SignUp from './routes/SignUp.tsx'
import Index from './routes/Index.tsx'

import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: indexLoader,
    children: [
      { index:true, element: <Index />},
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
