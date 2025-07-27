import { useDetachmentData } from '@/shared/hooks/useDetachmentData';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { type IdToDetachAction } from '@/shared/types/Reducers/Custom/DetachmentAction';
import { type MouseEventHandler } from 'react';

export const useLocalDetachHandler = (): ((
    role: RoleIndex
) => MouseEventHandler<SVGSVGElement>) => {
    const dispatch = useDispatch<IdToDetachAction<RoleIndex>>();
    const detachmentData = useDetachmentData();
    return (role) => {
        return (evt) => {
            evt.stopPropagation();
            if (detachmentData === null) {
                return;
            }
            if (detachmentData.detachmentConfirm) {
                dispatch({
                    type: 'to-detach',
                    payload: role,
                });
            } else {
                detachmentData.onDetach();
            }
        };
    };
};
