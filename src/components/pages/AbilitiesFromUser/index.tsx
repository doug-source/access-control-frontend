import { AbilitiesFromUserTemplate } from '@/components/templates/AbilitiesFromUserTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { PermissionsRequesterProvider } from '@/shared/providers/PermissionsRequesterProvider';
import { useDeps } from './shared/useDeps';

export const AbilitiesFromUser = () => {
    const [state, dispatch] = useDeps();
    return (
        <PermissionsRequesterProvider>
            <PageRequesterProvider>
                <DispatchProvider dispatch={dispatch}>
                    <AbilitiesFromUserTemplate state={state} />
                </DispatchProvider>
            </PageRequesterProvider>
        </PermissionsRequesterProvider>
    );
};
