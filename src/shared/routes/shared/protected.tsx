import { Ability } from '@/components/pages/Ability';
import { AbilityForm } from '@/components/pages/AbilityForm';
import { Config } from '@/components/pages/Config';
import { RegisterPermission } from '@/components/pages/RegisterPermission';
import { RegisterPermissions } from '@/components/pages/RegisterPermissions';
import { RegisterRequest } from '@/components/pages/RegisterRequest';
import { RegisterRequests } from '@/components/pages/RegisterRequests';
import { Role } from '@/components/pages/Role';
import { RoleForm } from '@/components/pages/RoleForm';
import { Roles } from '@/components/pages/Roles';
import { User } from '@/components/pages/User';
import { UserConfig } from '@/components/pages/UserConfig';
import { UserForm } from '@/components/pages/UserForm';
import { Users } from '@/components/pages/Users';
import { UsersRemoved } from '@/components/pages/UsersRemoved';
import { MainLayout } from '@/components/templates/MainLayout';
import { AppTitle } from '@/shared/components/atoms/AppTitle';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { abilityFormBase } from '@/shared/utils/globals/abilityForm';
import { roleFormBase } from '@/shared/utils/globals/roleForm';
import { userConfigBase } from '@/shared/utils/globals/userConfig';
import { userFormBase } from '@/shared/utils/globals/userForm';
import {
    abilityRoutes,
    emailVerifyRoutes,
    rolesFromUserRoutes,
} from './multiple';

export const protectedRoutes = [
    {
        element: <MainLayout />,
        children: [
            {
                path: '/home',
                element: <AppTitle />,
            },
            {
                element: <Gate abilityName="user-screen" />,
                children: [
                    {
                        path: '/users',
                        element: (
                            <ScreenWrapper title="Usuários">
                                <Users />
                            </ScreenWrapper>
                        ),
                    },
                    {
                        path: '/users-removed',
                        element: (
                            <ScreenWrapper title="Usuários Removidos">
                                <UsersRemoved />
                            </ScreenWrapper>
                        ),
                    },
                ],
            },
            {
                element: <CheckParams id={/^\d+$/} />,
                children: [
                    {
                        element: <ViewerProvider />,

                        children: [
                            {
                                element: (
                                    <Gate abilityName="show-user-screen" />
                                ),
                                children: [
                                    {
                                        path: '/users/:id',
                                        element: (
                                            <ScreenWrapper title="Visão geral do Usuário">
                                                <User />
                                            </ScreenWrapper>
                                        ),
                                    },
                                    {
                                        path: '/users/removed/:id',
                                        element: (
                                            <ScreenWrapper title="Visão geral do Usuário">
                                                <User />
                                            </ScreenWrapper>
                                        ),
                                    },
                                ],
                            },
                            {
                                element: (
                                    <Gate abilityName="show-role-screen" />
                                ),
                                children: [
                                    {
                                        path: '/roles/:id',
                                        element: (
                                            <ScreenWrapper title="Visão geral do papel">
                                                <Role />
                                            </ScreenWrapper>
                                        ),
                                    },
                                ],
                            },
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
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                element: <Gate abilityName="add-user-screen" />,
                children: [
                    {
                        path: '/users-create',
                        element: (
                            <ScreenWrapper title="Criar usuário">
                                <LogicBaseProvider base={userFormBase}>
                                    <UserForm />
                                </LogicBaseProvider>
                            </ScreenWrapper>
                        ),
                    },
                ],
            },
            {
                element: <Gate abilityName="add-role-screen" />,
                children: [
                    {
                        path: '/roles-create',
                        element: (
                            <ScreenWrapper title="Criar Papel">
                                <LogicBaseProvider base={roleFormBase}>
                                    <RoleForm />
                                </LogicBaseProvider>
                            </ScreenWrapper>
                        ),
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
                                <LogicBaseProvider base={abilityFormBase}>
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
            {
                element: <Gate abilityName="role-screen" />,
                children: [
                    {
                        path: '/roles',
                        element: (
                            <ScreenWrapper title="Papéis">
                                <Roles />
                            </ScreenWrapper>
                        ),
                    },
                ],
            },
            ...rolesFromUserRoutes(),
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
                        <LogicBaseProvider base={userConfigBase}>
                            <UserConfig />
                        </LogicBaseProvider>
                    </ScreenWrapper>
                ),
            },
        ],
    },
    ...emailVerifyRoutes(),
];
