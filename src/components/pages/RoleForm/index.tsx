import { RoleFormTemplate } from '@/components/templates/RoleFormTemplate';
import { useDeps } from './shared/useDeps';

export const RoleForm = () => {
    const [state, formAction, pending] = useDeps();
    return (
        <RoleFormTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
