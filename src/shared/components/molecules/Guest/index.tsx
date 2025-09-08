import { useSignState } from '@/shared/hooks/useSignState';
import { Navigate, Outlet } from 'react-router';

export const Guest = () => {
    const user = useSignState().state.user;
    if (user !== null && typeof user !== 'undefined') {
        return <Navigate to="/home" replace />;
    }
    return <Outlet />;
};
