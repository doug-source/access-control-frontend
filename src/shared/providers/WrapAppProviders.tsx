import { AllocateAuth } from '@/shared/components/atoms/AllocateAuth';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import type { TokenSetter } from '@/shared/types/Contracts/TokenSetter';
import { abilityFormBase } from '@/shared/utils/globals/abilityForm';
import { loginBase } from '@/shared/utils/globals/login';
import { roleFormBase } from '@/shared/utils/globals/roleForm';
import { userConfigBase } from '@/shared/utils/globals/userConfig';
import { userFormBase } from '@/shared/utils/globals/userForm';
import { useMemo, type PropsWithChildren } from 'react';
import { UnauthenticatorProvider } from './UnauthenticatorProvider';

export const WrapAppProviders = ({ children }: PropsWithChildren) => {
    const setters = useMemo<TokenSetter[]>(
        () => [
            loginBase.dispatcher,
            userFormBase.dispatcher,
            roleFormBase.dispatcher,
            abilityFormBase.dispatcher,
            userConfigBase.dispatcher,
        ],
        []
    );
    return (
        <HttpClientProvider>
            <AllocateAuth setters={setters}>
                <UnauthenticatorProvider>{children}</UnauthenticatorProvider>
            </AllocateAuth>
        </HttpClientProvider>
    );
};
