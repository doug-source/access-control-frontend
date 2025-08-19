import { UserFormTemplate } from '@/components/templates/UserFormTemplate';
import { useDeps } from './shared/useDeps';

export const UserForm = () => {
    const [state, formAction, pending] = useDeps();
    return (
        <UserFormTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
