import { UserFormTemplate } from '@/components/templates/UserFormTemplate';
import { UserTemplate } from '@/components/templates/UserTemplate';
import { useFormDeps } from './shared/useFormDeps';

interface UserProps {
    removed?: boolean;
}

export const User = ({ removed = false }: UserProps) => (
    <UserTemplate removed={removed} />
);

const Form = () => {
    const [state, formAction, pending] = useFormDeps();
    return (
        <UserFormTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
User.Form = Form;
