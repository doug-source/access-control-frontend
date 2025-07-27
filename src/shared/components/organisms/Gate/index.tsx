import { ProtectedRoute } from '@/shared/components/molecules/ProtectedRoute';
import { useAuth } from '@/shared/hooks/useAuth';
import type { Abilities } from '@/shared/types/Models/Ability';

interface GateProps {
    abilityName: Abilities;
}

export const Gate = ({ abilityName }: GateProps) => {
    const abilities = useAuth()?.abilities ?? [];
    return (
        <ProtectedRoute
            redirectPath="/home"
            allowed={abilities.includes(abilityName)}
        />
    );
};
