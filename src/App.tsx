import { LocalNavigate } from '@/shared/components/atoms/LocalNavigate';
import { ProtectedRoute } from '@/shared/components/molecules/ProtectedRoute';
import { useAuth } from '@/shared/hooks/useAuth';
import { userEmailMustVerify } from '@/shared/utils/userEmailMustVerify';
import { useLocation } from 'react-router';
import './animations.css';

export const App = () => {
    const auth = useAuth();
    const location = useLocation();
    if (userEmailMustVerify(auth, location)) {
        return <LocalNavigate to="/email/verify" />;
    }
    return <ProtectedRoute allowed={auth?.user !== null} />;
};

export default App;
