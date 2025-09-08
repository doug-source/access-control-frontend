import type { XOR } from '@/shared/types/Xor';
import type { MouseEvent } from 'react';
import { useNavigate } from 'react-router';

interface UserInfo {
    from: 'user';
}
interface RoleInfo {
    from: 'role';
    attach?: boolean;
}

export const useToAbilityRouteHandler = <W = SVGSVGElement>({
    from,
    attach = false,
}: XOR<UserInfo, RoleInfo>) => {
    const navigate = useNavigate();
    return (data: { id: number }) => {
        return (evt: MouseEvent<W, globalThis.MouseEvent>) => {
            evt.stopPropagation();
            navigate(`/abilities/${from}/${data.id}${attach ? '/attach' : ''}`);
        };
    };
};
