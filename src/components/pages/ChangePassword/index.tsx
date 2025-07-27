import { ChangePasswordTemplate } from '@/components/templates/ChangePasswordTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { ResetPasswordHandlerProvider } from '@/shared/providers/guest/ResetPasswordHandlerProvider';
import { useDeps } from './shared/useDeps';

export const ChangePassword = () => {
    const [state, dispatch] = useDeps();
    return (
        <ResetPasswordHandlerProvider>
            <DispatchProvider dispatch={dispatch}>
                <ChangePasswordTemplate state={state} />
            </DispatchProvider>
        </ResetPasswordHandlerProvider>
    );
};
