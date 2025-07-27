import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type IdToDetachAction } from '@/shared/types/Reducers/Custom/DetachmentAction';
import { useDetachmentData } from './useDetachmentData';
import { useDispatch } from './useDispatch';

export const useAbilityLocalDetachHandler = (): ((
    ability: AbilityIndex
) => void) => {
    const detachmentData = useDetachmentData();
    const dispatch = useDispatch<IdToDetachAction<AbilityIndex>>();
    return (ability) => {
        if (detachmentData === null) {
            return;
        }
        if (detachmentData.detachmentConfirm) {
            dispatch({
                type: 'to-detach',
                payload: ability,
            });
        } else {
            detachmentData.onDetach();
        }
    };
};
