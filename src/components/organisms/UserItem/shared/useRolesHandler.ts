import type { UserIndex } from '@/shared/types/Models/User';
import type { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';

export const useRolesHandler = (): ((
    user: UserIndex
) => MouseEventHandler<HTMLButtonElement>) => {
    const navigate = useNavigate();
    return (user) => {
        return (evt) => {
            evt.stopPropagation();
            navigate(`/roles/user/${user.id}`);
        };
    };
};
