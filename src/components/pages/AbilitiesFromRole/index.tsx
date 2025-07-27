import { AbilitiesFromRoleTemplate } from '@/components/templates/AbilitiesFromRoleTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { PermissionsRequesterProvider } from '@/shared/providers/PermissionsRequesterProvider';
import { useDeps } from './shared/useDeps';

export const AbilitiesFromRole = () => {
    const [state, dispatch] = useDeps();
    return (
        <PermissionsRequesterProvider>
            <PageRequesterProvider>
                <DispatchProvider dispatch={dispatch}>
                    <AbilitiesFromRoleTemplate state={state} />
                </DispatchProvider>
            </PageRequesterProvider>
        </PermissionsRequesterProvider>
    );
};
