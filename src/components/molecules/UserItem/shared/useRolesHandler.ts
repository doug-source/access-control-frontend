import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { type UserIndex } from '@/shared/types/Models/User';
import { type MouseEventHandler } from 'react';

export const useRolesHandler = (): ((
    user: UserIndex
) => MouseEventHandler<SVGSVGElement>) => {
    const navigate = useLocalNavigate();
    return (user) => {
        return (evt) => {
            evt.stopPropagation();
            navigate(`/roles/user/${user.id}`, {
                state: {
                    label: 'Propriedade (usuário)',
                    value: user.name,
                    data: user,
                },
            });
        };
    };
};
