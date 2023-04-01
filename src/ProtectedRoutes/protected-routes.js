import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

function ProtectedRoutes({ roles }) {
    const auth = useAuth();
    const location = useLocation();

    return auth ? (
        roles.includes(auth?.user?.role) ? (
            <Outlet />
        ) : (
            <Navigate to={'/'} state={{ from: location }} replace />
        )
    ) : (
        <Navigate to={'/'} state={{ from: location }} replace />
    );
}

export default ProtectedRoutes;
