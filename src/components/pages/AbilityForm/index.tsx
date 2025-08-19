import { AbilityFormTemplate } from '@/components/templates/AbilityFormTemplate';
import { useDeps } from './shared/useDeps';

export const AbilityForm = () => {
    const [state, formAction, pending] = useDeps();
    return (
        <AbilityFormTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
