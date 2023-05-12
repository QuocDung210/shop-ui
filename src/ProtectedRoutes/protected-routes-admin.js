import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

function ProtectedRoutesAdmin(roles) {
    const auth = useAuth();
    const location = useLocation();

    return auth ? (
        roles.includes(auth?.user?.role) ? (
            <Outlet />
        ) : (
            <Navigate to={'/admin/order'} state={{ from: location }} replace />
        )
    ) : (
        <Navigate to={'/login'} state={{ from: location }} replace />
    );
}

export default ProtectedRoutesAdmin;
