import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Login, {
  // action as loginAction,
} from './routes/Login.tsx'
import SignUp from './routes/SignUp.tsx'
import Index from './routes/Index.tsx'
import Dashboard from './routes/Dashboard.tsx'
import ErrorPage from './error-page.tsx'
import { AuthProvider } from './AuthProvider.tsx'
// import { useAuth } from './AuthProvider.tsx'
import Profile from './routes/Profile.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'


import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: indexLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard/:userId",
            element: <Dashboard />,
          },
          {
            path: "profile/:userId",
            element: <Profile />,
          },
        ]
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
