import { useAuth } from "../AuthProvider"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
    const { loggedIn } = useAuth();

    if (!loggedIn) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute;
