import { useAuth } from '@/shared/hooks/useAuth';
import type { AuthSetter } from '@/shared/types/Contracts/AuthSetter';
import type { PropsWithChildren } from 'react';

interface AllocateAuthProps extends PropsWithChildren {
    setters: AuthSetter[];
}

export const AllocateAuth = ({ setters, children }: AllocateAuthProps) => {
    const auth = useAuth();
    setters.forEach((setter) => setter.setAuth(auth));
    return children;
};
