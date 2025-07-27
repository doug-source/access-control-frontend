import { RegisterAccountTemplate } from '@/components/templates/RegisterAccountTemplate';
import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { useDeps } from './shared/useDeps';

export const RegisterAccount = () => {
    const [state, dispatch] = useDeps();
    return (
        <CreatorProvider>
            <DispatchProvider dispatch={dispatch}>
                <RegisterAccountTemplate state={state} />
            </DispatchProvider>
        </CreatorProvider>
    );
};
