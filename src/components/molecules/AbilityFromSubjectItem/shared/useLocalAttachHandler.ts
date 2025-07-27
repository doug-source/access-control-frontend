import { useAttachmentData } from '@/shared/hooks/useAttachmentData';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type IdToAttachAction } from '@/shared/types/Reducers/Custom/AttachmentAction';

export const useLocalAttachHandler = (): ((ability: AbilityIndex) => void) => {
    const attachmentData = useAttachmentData();
    const dispatch = useDispatch<IdToAttachAction<AbilityIndex>>();
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
