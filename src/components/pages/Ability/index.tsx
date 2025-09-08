import { AbilityFormTemplate } from '@/components/templates/AbilityFormTemplate';
import { AbilityTemplate } from '@/components/templates/AbilityTemplate';
import { useFormDeps } from './shared/useFormDeps';

export const Ability = () => <AbilityTemplate />;

const Form = () => {
    const [state, formAction, pending] = useFormDeps();
    return (
        <AbilityFormTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
Ability.Form = Form;
