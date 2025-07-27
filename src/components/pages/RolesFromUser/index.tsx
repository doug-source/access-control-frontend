import { RolesFromUserTemplate } from '@/components/templates/RolesFromUserTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { PermissionsRequesterProvider } from '@/shared/providers/PermissionsRequesterProvider';
import { useDeps } from './shared/useDeps';

export const RolesFromUser = () => {
    const [state, dispatch] = useDeps();
    return (
        <PageRequesterProvider>
            <PermissionsRequesterProvider>
                <DispatchProvider dispatch={dispatch}>
                    <RolesFromUserTemplate state={state} />
                </DispatchProvider>
            </PermissionsRequesterProvider>
        </PageRequesterProvider>
    );
};
