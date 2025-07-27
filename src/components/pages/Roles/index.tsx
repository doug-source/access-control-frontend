import { RolesTemplate } from '@/components/templates/RolesTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { useDeps } from './shared/useDeps';

export const Roles = () => {
    const [state, dispatch] = useDeps();
    return (
        <PageRequesterProvider>
            <DispatchProvider dispatch={dispatch}>
                <RolesTemplate state={state} />
            </DispatchProvider>
        </PageRequesterProvider>
    );
};
