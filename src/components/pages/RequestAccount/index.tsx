import { RequestAccountTemplate } from '@/components/templates/RequestAccountTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { RegisterRequestMakerProvider } from '@/shared/providers/guest/RegisterRequestMakerProvider';
import { useDeps } from './shared/useDeps';

export const RequestAccount = () => {
    const [state, dispatch] = useDeps();
    return (
        <RegisterRequestMakerProvider>
            <DispatchProvider dispatch={dispatch}>
                <RequestAccountTemplate state={state} />
            </DispatchProvider>
        </RegisterRequestMakerProvider>
    );
};
