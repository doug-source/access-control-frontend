import { useDetachmentData } from '@/shared/hooks/useDetachmentData';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type IdToDetachAction } from '@/shared/types/Reducers/Custom/DetachmentAction';

export const useLocalDetachHandler = (): ((ability: AbilityIndex) => void) => {
    const dispatch = useDispatch<IdToDetachAction<AbilityIndex>>();
    const detachmentData = useDetachmentData();
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
