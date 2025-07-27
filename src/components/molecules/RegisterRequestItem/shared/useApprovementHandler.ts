import { useApprovementData } from '@/shared/hooks/useApprovementData';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { type RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { type IdToApproveAction } from '@/shared/types/Reducers/Custom/ApprovementAction';
import { type MouseEventHandler } from 'react';

export const useApprovementHandler = (): ((
    registerRequest: RegisterRequestIndex
) => MouseEventHandler<SVGSVGElement>) => {
    const dispatch = useDispatch<IdToApproveAction<RegisterRequestIndex>>();
    const approvementData = useApprovementData();
    return (registerRequest) => {
        return (evt) => {
            evt.stopPropagation();
            if (approvementData?.approvementConfirm) {
                dispatch({
                    type: 'to-approve',
                    payload: registerRequest,
                });
            } else {
                approvementData?.onApprove();
            }
        };
    };
};
