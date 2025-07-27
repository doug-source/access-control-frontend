import { LoginTemplate } from '@/components/templates/LoginTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { useDeps } from './shared/useDeps';

export const Login = () => {
    const [state, dispatch] = useDeps();
    return (
        <DispatchProvider dispatch={dispatch}>
            <LoginTemplate state={state} />
        </DispatchProvider>
    );
};
