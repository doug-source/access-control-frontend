import { ForgotPasswordTemplate } from '@/components/templates/ForgotPasswordTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { ForgotPasswordHandlerProvider } from '@/shared/providers/guest/ForgotPasswordHandlerProvider';
import { useDeps } from './shared/useDeps';

export const ForgotPassword = () => {
    const [state, dispatch] = useDeps();
    return (
        <ForgotPasswordHandlerProvider>
            <DispatchProvider dispatch={dispatch}>
                <ForgotPasswordTemplate state={state} />
            </DispatchProvider>
        </ForgotPasswordHandlerProvider>
    );
};
