import { Config } from '@/components/pages/Config';
import { UserConfig } from '@/components/pages/UserConfig';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { attachToken } from '@/shared/utils/attachToken';
import { userConfigBase } from '@/shared/utils/globals/userConfig';

export const makeConfigRoutes = (token: string) => [
    {
        path: '/config',
        element: (
            <ScreenWrapper title="Configurações">
                <Config />
            </ScreenWrapper>
        ),
    },
    {
        path: '/config-user',
        element: (
            <ScreenWrapper title="Configurações do usuário">
                <LogicBaseProvider base={attachToken(userConfigBase, token)}>
                    <UserConfig />
                </LogicBaseProvider>
            </ScreenWrapper>
        ),
    },
];
