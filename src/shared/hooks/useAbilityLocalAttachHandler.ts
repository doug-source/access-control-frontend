import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type IdToAttachAction } from '@/shared/types/Reducers/Custom/AttachmentAction';
import { useAttachmentData } from './useAttachmentData';
import { useDispatch } from './useDispatch';

export const useAbilityLocalAttachHandler = (): ((
    ability: AbilityIndex
) => void) => {
    const dispatch = useDispatch<IdToAttachAction<AbilityIndex>>();
    const attachmentData = useAttachmentData();
    return (ability) => {
        if (attachmentData === null) {
            return;
        }
        if (attachmentData.attachmentConfirm) {
            dispatch({
                type: 'to-attach',
                payload: ability,
            });
        } else {
            attachmentData.onAttach();
        }
    };
};
