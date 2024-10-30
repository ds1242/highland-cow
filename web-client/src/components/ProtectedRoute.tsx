import { useAuth } from "../AuthProvider"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
    const { loggedIn } = useAuth();

    if (!loggedIn) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute;
