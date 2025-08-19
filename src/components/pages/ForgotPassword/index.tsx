import { ForgotPasswordTemplate } from '@/components/templates/ForgotPasswordTemplate';
import { useDeps } from './shared/useDeps';

export const ForgotPassword = () => {
    const [state, formAction, pending] = useDeps();
    return (
        <ForgotPasswordTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
