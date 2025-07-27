import { RoleTemplate } from '@/components/templates/RoleTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { useDeps } from './shared/useDeps';

export const Role = () => {
    const [state, dispatch] = useDeps();
    return (
        <DispatchProvider dispatch={dispatch}>
            <RoleTemplate state={state} />
        </DispatchProvider>
    );
};
