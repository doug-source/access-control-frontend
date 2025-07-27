import { useAttachmentData } from '@/shared/hooks/useAttachmentData';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { type IdToAttachAction } from '@/shared/types/Reducers/Custom/AttachmentAction';
import { type MouseEventHandler } from 'react';

export const useLocalAttachHandler = (): ((
    role: RoleIndex
) => MouseEventHandler<SVGSVGElement>) => {
    const dispatch = useDispatch<IdToAttachAction<RoleIndex>>();
    const attachmentData = useAttachmentData();
    return (role) => {
        return (evt) => {
            evt.stopPropagation();
            if (attachmentData === null) {
                return;
            }
            if (attachmentData.attachmentConfirm) {
                dispatch({
                    type: 'to-attach',
                    payload: role,
                });
            } else {
                attachmentData.onAttach();
            }
        };
    };
};
