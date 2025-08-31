import { LocalNavigate } from '@/shared/components/atoms/LocalNavigate';
import { ProtectedRoute } from '@/shared/components/molecules/ProtectedRoute';
import { useSignState } from '@/shared/hooks/useSignState';
import { userEmailMustVerify } from '@/shared/utils/userEmailMustVerify';
import { useLocation } from 'react-router';
import './animations.css';

export const App = () => {
    const user = useSignState().user;
    const location = useLocation();
    if (userEmailMustVerify(user, location)) {
        return <LocalNavigate to="/email/verify" />;
    }
    return <ProtectedRoute allowed={user !== null} />;
};

export default App;
