import { AllocateAuth } from '@/shared/components/atoms/AllocateAuth';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import type { AuthSetter } from '@/shared/types/Contracts/AuthSetter';
import { loginBase } from '@/shared/utils/globals/login';
import { useMemo, type PropsWithChildren } from 'react';

export const WrapGuestProviders = ({ children }: PropsWithChildren) => {
    const setters = useMemo<AuthSetter[]>(() => [loginBase.dispatcher], []);
    return (
        <HttpClientProvider>
            <AllocateAuth setters={setters}>{children}</AllocateAuth>
        </HttpClientProvider>
    );
};
