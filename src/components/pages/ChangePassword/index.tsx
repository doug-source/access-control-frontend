import { ChangePasswordTemplate } from '@/components/templates/ChangePasswordTemplate';
import { LocalNavigate } from '@/shared/components/atoms/LocalNavigate';
import { useDeps } from './shared/useDeps';

export const ChangePassword = () => {
    const [state, formAction, pending] = useDeps();
    if (state.requestStatus.statusCode === 200) {
        return <LocalNavigate to="/" replace />;
    }
    return (
        <ChangePasswordTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
