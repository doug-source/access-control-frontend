import { LoginTemplate } from '@/components/templates/LoginTemplate';
import { useDeps } from './shared/useDeps';

export const Login = () => {
    const [state, formAction, pending] = useDeps();
    return (
        <LoginTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
