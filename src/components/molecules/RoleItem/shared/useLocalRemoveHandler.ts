import { useRemotionData } from '@/shared/hooks/useRemotionData';
import { RoleIndex } from '@/shared/types/Models/Role';
import { IdToRemovedAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { ActionDispatch, type MouseEventHandler } from 'react';

export const useLocalRemoveHandler = (
    role: RoleIndex,
    dispatch: ActionDispatch<[action: IdToRemovedAction<RoleIndex>]>
): MouseEventHandler<SVGSVGElement> => {
    const { remotionConfirm, onRemove } = useRemotionData();
    return (evt) => {
        evt.stopPropagation();
        if (remotionConfirm) {
            dispatch({
                type: 'to-remove',
                payload: role,
            });
        } else {
            onRemove();
        }
    };
};
