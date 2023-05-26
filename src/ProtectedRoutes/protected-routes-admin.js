import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

function ProtectedRoutesAdmin({ roles }) {
    const auth = useAuth();
    const location = useLocation();

    return auth ? (
        roles.includes(auth?.user?.role) ? (
            <Outlet />
        ) : auth?.user?.role === 'employee' ? (
            <Navigate to={'/admin/employee'} state={{ from: location }} replace />
        ) : (
            <Navigate to={'/'} state={{ from: location }} replace />
        )
    ) : (
        <Navigate to={'/admin/login'} state={{ from: location }} replace />
    );
}

export default ProtectedRoutesAdmin;
