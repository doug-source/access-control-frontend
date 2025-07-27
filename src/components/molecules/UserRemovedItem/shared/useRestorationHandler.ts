import { useDispatch } from '@/shared/hooks/useDispatch';
import { useRestorationData } from '@/shared/hooks/useRestorationData';
import { type UserIndex } from '@/shared/types/Models/User';
import { type IdToRestoreAction } from '@/shared/types/Reducers/Custom/RestorationAction';
import { type MouseEventHandler } from 'react';

export const useRestorationHandler = (): ((
    user: UserIndex
) => MouseEventHandler<SVGSVGElement>) => {
    const restorationData = useRestorationData();
    const dispatch = useDispatch<IdToRestoreAction<UserIndex>>();
    return (user) => {
        return (evt) => {
            evt.stopPropagation();
            if (restorationData?.restorationConfirm) {
                dispatch({
                    type: 'to-restore',
                    payload: user,
                });
            } else {
                restorationData?.onRestore();
            }
        };
    };
};
