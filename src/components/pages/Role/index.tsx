import { RoleFormTemplate } from '@/components/templates/RoleFormTemplate';
import { RoleTemplate } from '@/components/templates/RoleTemplate';
import { useFormDeps } from './shared/useFormDeps';

export const Role = () => <RoleTemplate />;

const Form = () => {
    const [state, formAction, pending] = useFormDeps();
    return (
        <RoleFormTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
Role.Form = Form;
