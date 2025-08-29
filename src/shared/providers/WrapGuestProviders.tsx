import { AllocateAuth } from '@/shared/components/atoms/AllocateAuth';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import type { TokenSetter } from '@/shared/types/Contracts/TokenSetter';
import { loginBase } from '@/shared/utils/globals/login';
import { useMemo, type PropsWithChildren } from 'react';

export const WrapGuestProviders = ({ children }: PropsWithChildren) => {
    const setters = useMemo<TokenSetter[]>(() => [loginBase.dispatcher], []);
    return (
        <HttpClientProvider>
            <AllocateAuth setters={setters}>{children}</AllocateAuth>
        </HttpClientProvider>
    );
};
