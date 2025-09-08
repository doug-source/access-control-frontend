import type { Paths } from '@/shared/types/Urls/Paths';
import { Navigate, Outlet } from 'react-router';

interface ProtectedRouteProps {
    allowed: boolean;
    redirectPath?: Paths['navigation']['concrete'];
}

export const ProtectedRoute = ({
    redirectPath = '/',
    allowed,
}: ProtectedRouteProps) => {
    if (!allowed) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};
