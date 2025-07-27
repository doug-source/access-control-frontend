import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { type RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { type IdToRemovedAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { useApprovementHandler } from './useApprovementHandler';
import { useLocalRemoveHandler } from './useLocalRemoveHandler';

export const useDeps = (registerRequest: RegisterRequestIndex) => {
    const approvementHandler = useApprovementHandler();
    const navigate = useLocalNavigate();
    const dispatch = useDispatch<IdToRemovedAction<RegisterRequestIndex>>();
    const remotionHandler = useLocalRemoveHandler(registerRequest, dispatch);
    return { navigate, approvementHandler, remotionHandler };
};
