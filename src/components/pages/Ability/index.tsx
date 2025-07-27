import { AbilityTemplate } from '@/components/templates/AbilityTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { abilityReducer } from '@/shared/reducers/abilityReducer';
import { abilityInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const Ability = () => {
    const [state, dispatch] = useReducer(abilityReducer, abilityInitialData);
    return (
        <DispatchProvider dispatch={dispatch}>
            <AbilityTemplate state={state} />
        </DispatchProvider>
    );
};
