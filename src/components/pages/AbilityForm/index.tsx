import { AbilityFormTemplate } from '@/components/templates/AbilityFormTemplate';
import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { useDeps } from './shared/useDeps';

export const AbilityForm = () => {
    const { state, dispatch } = useDeps();

    return (
        <CreatorProvider>
            <DispatchProvider dispatch={dispatch}>
                <AbilityFormTemplate state={state} />
            </DispatchProvider>
        </CreatorProvider>
    );
};
