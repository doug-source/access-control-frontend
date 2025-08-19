import { RequestAccountTemplate } from '@/components/templates/RequestAccountTemplate';
import { useDeps } from './shared/useDeps';

export const RequestAccount = () => {
    const [state, formAction, pending] = useDeps();
    return (
        <RequestAccountTemplate
            state={state}
            formAction={formAction}
            pending={pending}
        />
    );
};
