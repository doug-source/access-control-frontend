import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useToAbilityRouteHandler } from '@/shared/hooks/useToAbilityRouteHandler';
import { type UserIndex } from '@/shared/types/Models/User';
import { type IdToAttachAction } from '@/shared/types/Reducers/Custom/AttachmentAction';
import { useId } from 'react';
import { useLocalAttach } from './useLocalAttach';
import { useMakeUserChecking } from './useMakeUserChecking';
import { useRemotionHandler } from './useRemotionHandler';
import { useRolesHandler } from './useRolesHandler';

export const useDeps = (user: UserIndex) => {
    const rolesHandler = useRolesHandler();
    const abilitiesHandler = useToAbilityRouteHandler<UserIndex>({
        endpoint: 'user',
        label: 'Propriedade (usuário)',
        makeValue: (arg) => arg.name,
    });
    const isCurrentUser = useMakeUserChecking();
    const remotionHandler = useRemotionHandler(isCurrentUser);
    const navigate = useLocalNavigate();
    const dispatch = useDispatch<IdToAttachAction<UserIndex>>();
    const attachHandler = useLocalAttach(user, dispatch);
    const trashBtnId = useId();
    const attachBtnId = useId();
    return {
        attachHandler,
        rolesHandler,
        remotionHandler,
        isCurrentUser,
        abilitiesHandler,
        navigate,
        trashBtnId,
        attachBtnId,
    };
};
