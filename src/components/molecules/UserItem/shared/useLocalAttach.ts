import { UserIndex } from '@/shared/types/Models/User';
import { IdToAttachAction } from '@/shared/types/Reducers/Custom/AttachmentAction';
import { ActionDispatch, MouseEventHandler } from 'react';

export const useLocalAttach = (
    user: UserIndex,
    dispatch: ActionDispatch<[action: IdToAttachAction<UserIndex>]>
): MouseEventHandler<HTMLButtonElement> => {
    return (evt) => {
        evt.stopPropagation();
        dispatch({ type: 'to-attach', payload: user });
    };
};
