import { useDispatch } from '@/shared/hooks/useDispatch';
import { useRemotionData } from '@/shared/hooks/useRemotionData';
import { type UserIndex } from '@/shared/types/Models/User';
import { type IdToRemovedAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { type MouseEventHandler } from 'react';

type HandlerReturn = (user: UserIndex) => MouseEventHandler<SVGSVGElement>;

export const useRemotionHandler = (): HandlerReturn => {
    const { remotionConfirm, onRemove } = useRemotionData();
    const dispatch = useDispatch<IdToRemovedAction<UserIndex>>();
    return (user: UserIndex) => {
        return (evt) => {
            evt.stopPropagation();
            if (remotionConfirm) {
                dispatch({
                    type: 'to-remove',
                    payload: user,
                });
            } else {
                onRemove();
            }
        };
    };
};
