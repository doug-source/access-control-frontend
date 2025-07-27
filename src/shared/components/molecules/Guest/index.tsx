import { LocalNavigate } from '@/shared/components/atoms/LocalNavigate';
import { useAuth } from '@/shared/hooks/useAuth';
import { Outlet } from 'react-router';

export const Guest = () => {
    const auth = useAuth();
    const user = auth?.user;
    if (user !== null && typeof user !== 'undefined') {
        return <LocalNavigate to="/home" replace />;
    }
    return <Outlet />;
};
