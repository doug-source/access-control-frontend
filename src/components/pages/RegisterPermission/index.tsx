import { RegisterPermissionTemplate } from '@/components/templates/RegisterPermissionTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { useDeps } from './shared/useDeps';

export const RegisterPermission = () => {
    const [state, dispatch] = useDeps();
    return (
        <DispatchProvider dispatch={dispatch}>
            <RegisterPermissionTemplate state={state} />
        </DispatchProvider>
    );
};
