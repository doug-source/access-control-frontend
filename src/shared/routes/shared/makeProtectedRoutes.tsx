import { Ability } from '@/components/pages/Ability';
import { AbilityForm } from '@/components/pages/AbilityForm';
import { Config } from '@/components/pages/Config';
import { RegisterPermission } from '@/components/pages/RegisterPermission';
import { RegisterPermissions } from '@/components/pages/RegisterPermissions';
import { RegisterRequest } from '@/components/pages/RegisterRequest';
import { RegisterRequests } from '@/components/pages/RegisterRequests';
import { UserConfig } from '@/components/pages/UserConfig';
import { MainLayout } from '@/components/templates/MainLayout';
import { AppTitle } from '@/shared/components/atoms/AppTitle';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { subjectShowLoader } from '@/shared/loaders/subjectShowLoader';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { attachToken } from '@/shared/utils/attachToken';
import { abilityFormBase } from '@/shared/utils/globals/abilityForm';
import { userConfigBase } from '@/shared/utils/globals/userConfig';
import { abilityRoutes, emailVerifyRoutes } from './multiple';
import { makeRoleRoutes } from './roles';
import { makeUserRoutes } from './users';

export const makeProtectedRoutes = (token: string) => [
    {
        element: <MainLayout />,
        children: [
            {
                path: '/home',
                element: <AppTitle />,
            },
            ...makeUserRoutes(token),
            ...makeRoleRoutes(token),
            {
                element: <CheckParams id={/^\d+$/} />,
                children: [
                    {
                        element: <ViewerProvider />,

                        children: [
                            {
                                element: (
                                    <Gate abilityName="show-ability-screen" />
                                ),
                                children: [
                                    {
                                        path: '/abilities/:id',
                                        element: (
                                            <ScreenWrapper title="Visão geral da habilidade">
                                                <Ability />
                                            </ScreenWrapper>
                                        ),
                                        loader: subjectShowLoader(
                                            token,
                                            (id) => `/api/abilities/${id}`
                                        ),
                                    },
                                ],
                            },
                            {
                                element: (
                                    <Gate abilityName="show-register-request-screen" />
                                ),
                                children: [
                                    {
                                        path: '/register-requests/:id',
                                        element: (
                                            <ScreenWrapper title="Visão geral do pedido">
                                                <RegisterRequest />
                                            </ScreenWrapper>
                                        ),
                                        loader: subjectShowLoader(
                                            token,
                                            (id) => {
                                                return `/api/registers/requests/${id}`;
                                            }
                                        ),
                                    },
                                ],
                            },
                            {
                                element: (
                                    <Gate abilityName="show-register-permission-screen" />
                                ),
                                children: [
                                    {
                                        path: '/register-permissions/:id',
                                        element: (
                                            <ScreenWrapper title="Visão geral da permissão">
                                                <RegisterPermission />
                                            </ScreenWrapper>
                                        ),
                                        loader: subjectShowLoader(
                                            token,
                                            (id) => {
                                                return `/api/registers/permissions/${id}`;
                                            }
                                        ),
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                element: <Gate abilityName="add-ability-screen" />,
                children: [
                    {
                        path: '/abilities-create',
                        element: (
                            <ScreenWrapper title="Criar Habilidade">
                                <LogicBaseProvider
                                    base={attachToken(abilityFormBase, token)}
                                >
                                    <AbilityForm />
                                </LogicBaseProvider>
                            </ScreenWrapper>
                        ),
                    },
                ],
            },
            {
                element: <Gate abilityName="register-request-screen" />,
                children: [
                    {
                        path: '/register-requests',
                        element: (
                            <ScreenWrapper title="Pedidos de registro">
                                <RegisterRequests />
                            </ScreenWrapper>
                        ),
                    },
                ],
            },
            {
                element: <Gate abilityName="register-permission-screen" />,
                children: [
                    {
                        path: '/register-permissions',
                        element: (
                            <ScreenWrapper title="Permissões concedidas">
                                <RegisterPermissions />
                            </ScreenWrapper>
                        ),
                    },
                ],
            },
            ...abilityRoutes(),
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
                        <LogicBaseProvider
                            base={attachToken(userConfigBase, token)}
                        >
                            <UserConfig />
                        </LogicBaseProvider>
                    </ScreenWrapper>
                ),
            },
        ],
    },
    ...emailVerifyRoutes(token),
];
