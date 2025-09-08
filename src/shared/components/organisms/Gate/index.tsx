import { ProtectedRoute } from '@/shared/components/molecules/ProtectedRoute';
import { useSignState } from '@/shared/hooks/useSignState';
import type { Abilities } from '@/shared/types/Models/Ability';

interface GateProps {
    abilityName: Abilities;
}

/**
 * Este component não funciona em React Router's actions definitions
 */
export const Gate = ({ abilityName }: GateProps) => {
    const abilities = useSignState().state.user?.abilities ?? [];
    return (
        <ProtectedRoute
            redirectPath="/home"
            allowed={abilities.includes(abilityName)}
        />
    );
};
