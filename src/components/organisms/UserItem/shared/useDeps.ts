import { useActionHandlers } from '@/shared/hooks/useActionHandlers';
import { useSignState } from '@/shared/hooks/useSignState';
import { useToAbilityRouteHandler } from '@/shared/hooks/useToAbilityRouteHandler';
import type { UserIndex } from '@/shared/types/Models/User';
import { useNavigate } from 'react-router';
import { useAttachClickHandler } from './useAttachClickHandler';
import { useRolesHandler } from './useRolesHandler';
import { useUserSignedChecking } from './useUserSignedChecking';

export const useDeps = (user: UserIndex) => {
    const rolesHandler = useRolesHandler();
    const abilitiesHandler = useToAbilityRouteHandler<HTMLButtonElement>({
        from: 'user',
    });
    const navigate = useNavigate();
    const isCurrentUser = useUserSignedChecking();
    const abilities = useSignState().state.user?.abilities ?? [];

    const outputs = useActionHandlers(
        `/users/remove/${user.id}`,
        'remotions',
        'user'
    );
    const attachOutput = useAttachClickHandler();

    return {
        abilities,
        abilitiesHandler,
        rolesHandler,
        navigate,
        isCurrentUser,
        ...outputs,
        ...attachOutput,
    };
};
