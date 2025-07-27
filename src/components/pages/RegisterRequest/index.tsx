import { RegisterRequestTemplate } from '@/components/templates/RegisterRequestTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { useDeps } from './shared/useDeps';

export const RegisterRequest = () => {
    const [state, dispatch] = useDeps();
    return (
        <DispatchProvider dispatch={dispatch}>
            <RegisterRequestTemplate state={state} />
        </DispatchProvider>
    );
};
