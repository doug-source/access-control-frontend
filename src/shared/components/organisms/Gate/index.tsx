import { ProtectedRoute } from '@/shared/components/molecules/ProtectedRoute';
import { useSignState } from '@/shared/hooks/useSignState';
import type { Abilities } from '@/shared/types/Models/Ability';

interface GateProps {
    abilityName: Abilities;
}

export const Gate = ({ abilityName }: GateProps) => {
    const abilities = useSignState().state.user?.abilities ?? [];
    return (
        <ProtectedRoute
            redirectPath="/home"
            allowed={abilities.includes(abilityName)}
        />
    );
};
