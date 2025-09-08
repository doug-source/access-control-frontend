import { RegisterAccountTemplate } from '@/components/templates/RegisterAccountTemplate';
import { Navigate } from 'react-router';
import { useDeps } from './shared/useDeps';

export const RegisterAccount = () => {
    const [state, formAction, pending] = useDeps();
    if (state.requestStatus.statusCode === 0) {
        return <Navigate to="/" replace />;
    }
    return (
        <RegisterAccountTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
