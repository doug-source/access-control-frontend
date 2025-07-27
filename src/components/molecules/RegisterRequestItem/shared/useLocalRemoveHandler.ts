import { useRemotionData } from '@/shared/hooks/useRemotionData';
import { RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { IdToRemovedAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { ActionDispatch, MouseEventHandler } from 'react';

export const useLocalRemoveHandler = (
    registerRequest: RegisterRequestIndex,
    dispatch: ActionDispatch<[action: IdToRemovedAction<RegisterRequestIndex>]>
): MouseEventHandler<SVGSVGElement> => {
    const { onRemove, remotionConfirm } = useRemotionData();
    return (evt) => {
        evt.stopPropagation();
        if (remotionConfirm) {
            dispatch({
                type: 'to-remove',
                payload: registerRequest,
            });
        } else {
            onRemove();
        }
    };
};
