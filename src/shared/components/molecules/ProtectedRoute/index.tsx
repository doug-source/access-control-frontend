import { LocalNavigate } from '@/shared/components/atoms/LocalNavigate';
import { type Paths } from '@/shared/types/Urls/Paths';
import { Outlet } from 'react-router';

interface ProtectedRouteProps {
    allowed: boolean;
    redirectPath?: Paths['navigation']['concrete'];
}

export const ProtectedRoute = ({
    redirectPath = '/',
    allowed,
}: ProtectedRouteProps) => {
    if (!allowed) {
        return <LocalNavigate to={redirectPath} replace />;
    }
    return <Outlet />;
};
