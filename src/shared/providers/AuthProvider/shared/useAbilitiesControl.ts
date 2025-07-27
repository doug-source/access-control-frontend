import type { Abilities } from '@/shared/types/Models/Ability';
import { type Dispatch, useCallback, useState } from 'react';

type DispatchAction = Dispatch<Abilities[]>;

export const useAbilitiesControl = () => {
    const [abilities, setAbilities] = useState<Abilities[]>([]);
    const updateAbilities: DispatchAction = useCallback(
        (abilities: Abilities[]) => {
            setAbilities(abilities);
        },
        []
    );
    return [abilities, updateAbilities] as const;
};
