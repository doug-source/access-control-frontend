import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import type { XOR } from '@/shared/types/Xor';
import type { MouseEvent } from 'react';

interface Info<T> {
    label: string;
    makeValue(arg: T): string;
}
interface UserInfo<T> extends Info<T> {
    endpoint: 'user';
}
interface RoleInfo<T> extends Info<T> {
    endpoint: 'role';
    attach?: boolean;
}

export const useToAbilityRouteHandler = <T extends { id: number }>({
    endpoint,
    label,
    makeValue,
    attach = false,
}: XOR<UserInfo<T>, RoleInfo<T>>) => {
    const navigate = useLocalNavigate();
    return (data: T) => {
        return (evt: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
            evt.stopPropagation();
            navigate(
                `/abilities/${endpoint}/${data.id}${attach ? '/attach' : ''}`,
                {
                    state: {
                        label,
                        value: makeValue(data),
                        data: data,
                    },
                }
            );
        };
    };
};
