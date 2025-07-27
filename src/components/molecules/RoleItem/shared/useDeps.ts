import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useToAbilityRouteHandler } from '@/shared/hooks/useToAbilityRouteHandler';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { type IdToRemovedAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { useLocalRemoveHandler } from './useLocalRemoveHandler';

export const useDeps = (role: RoleIndex) => {
    const abilitiesHandler = useToAbilityRouteHandler<RoleIndex>({
        endpoint: 'role',
        label: 'Propriedade (papel)',
        makeValue: (arg) => arg.name,
    });
    const abilitiesToAttachHandler = useToAbilityRouteHandler<RoleIndex>({
        endpoint: 'role',
        label: 'Escolha as novas habilidades',
        makeValue: (arg) => `Papel: ${arg.name}`,
        attach: true,
    });
    const dispatch = useDispatch<IdToRemovedAction<RoleIndex>>();
    const removeHandler = useLocalRemoveHandler(role, dispatch);
    return {
        abilitiesHandler,
        abilitiesToAttachHandler,
        removeHandler,
        navigate: useLocalNavigate(),
    };
};
