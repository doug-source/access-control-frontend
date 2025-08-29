import { useAuth } from '@/shared/hooks/useAuth';
import type { TokenSetter } from '@/shared/types/Contracts/TokenSetter';
import type { PropsWithChildren } from 'react';

interface AllocateAuthProps extends PropsWithChildren {
    setters: TokenSetter[];
}

export const AllocateAuth = ({ setters, children }: AllocateAuthProps) => {
    const auth = useAuth();
    setters.forEach((setter) => setter.setToken(auth?.user?.token ?? ''));
    return children;
};
