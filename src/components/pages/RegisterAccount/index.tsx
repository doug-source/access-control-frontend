import { RegisterAccountTemplate } from '@/components/templates/RegisterAccountTemplate';
import { LocalNavigate } from '@/shared/components/atoms/LocalNavigate';
import { useDeps } from './shared/useDeps';

export const RegisterAccount = () => {
    const [state, formAction, pending] = useDeps();
    if (state.requestStatus.statusCode === 0) {
        return <LocalNavigate to="/" replace />;
    }
    return (
        <RegisterAccountTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
