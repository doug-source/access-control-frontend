import { ChangePasswordTemplate } from '@/components/templates/ChangePasswordTemplate';
import { Navigate } from 'react-router';
import { useDeps } from './shared/useDeps';

export const ChangePassword = () => {
    const [state, formAction, pending] = useDeps();
    if (state.requestStatus.statusCode === 200) {
        return <Navigate to="/" replace />;
    }
    return (
        <ChangePasswordTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
