import { useDispatch } from '@/shared/hooks/useDispatch';
import { useRemotionData } from '@/shared/hooks/useRemotionData';
import { type UserIndex } from '@/shared/types/Models/User';
import { type IdToRemovedAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { type MouseEventHandler } from 'react';

type HandlerReturn = (user: UserIndex) => MouseEventHandler<HTMLButtonElement>;

export const useRemotionHandler = (
    isCurrentUser: (user: UserIndex) => boolean
): HandlerReturn => {
    const { remotionConfirm, onRemove } = useRemotionData();
    const dispatch = useDispatch<IdToRemovedAction<UserIndex>>();
    return (user: UserIndex) => {
        return (evt) => {
            evt.stopPropagation();
            if (isCurrentUser(user)) {
                return;
            }
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
