import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
export const PrivateRoute = () => {
    const { authenticated, loading } = useAuth();

    if (loading) {
        return <div>A carregar...</div>;
    }

    return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;