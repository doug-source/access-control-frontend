import { AbilitiesTemplate } from '@/components/templates/AbilitiesTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { useDeps } from './shared/useDeps';

export const Abilities = () => {
    const [state, dispatch] = useDeps();
    return (
        <PageRequesterProvider>
            <DispatchProvider dispatch={dispatch}>
                <AbilitiesTemplate state={state} />
            </DispatchProvider>
        </PageRequesterProvider>
    );
};
