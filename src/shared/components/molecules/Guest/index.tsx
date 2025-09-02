import { LocalNavigate } from '@/shared/components/atoms/LocalNavigate';
import { useSignState } from '@/shared/hooks/useSignState';
import { Outlet } from 'react-router';

export const Guest = () => {
    const user = useSignState().state.user;
    if (user !== null && typeof user !== 'undefined') {
        return <LocalNavigate to="/home" replace />;
    }
    return <Outlet />;
};
