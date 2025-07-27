import { useDispatch } from '@/shared/hooks/useDispatch';
import { useRemotionData } from '@/shared/hooks/useRemotionData';
import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type IdToRemovedAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { type MouseEventHandler } from 'react';

export const useLocalHandler = (): ((
    ability: AbilityIndex
) => MouseEventHandler<SVGSVGElement>) => {
    const dispatch = useDispatch<IdToRemovedAction<AbilityIndex>>();
    const { remotionConfirm, onRemove } = useRemotionData();
    return (ability) => {
        return (evt) => {
            evt.stopPropagation();
            if (remotionConfirm) {
                dispatch({
                    type: 'to-remove',
                    payload: ability,
                });
            } else {
                onRemove();
            }
        };
    };
};
