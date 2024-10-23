import { useAuth } from "../AuthProvider"


function ProtectedRoute({ children: any }) {
    const isAuthenticated = // your auth check logic here
  
  if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}
