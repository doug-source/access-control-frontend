import { User } from '@/components/pages/User';
import { UserForm } from '@/components/pages/UserForm';
import { Users } from '@/components/pages/Users';
import { UsersRemoved } from '@/components/pages/UsersRemoved';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { subjectShowLoader } from '@/shared/loaders/subjectShowLoader';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { attachToken } from '@/shared/utils/attachToken';
import { userFormBase } from '@/shared/utils/globals/userForm';

export const makeUserRoutes = (token: string) => [
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
                path: '/users/removed',
                element: (
                    <ScreenWrapper title="Usuários Removidos">
                        <UsersRemoved />
                    </ScreenWrapper>
                ),
            },
        ],
    },
    {
        element: <Gate abilityName="add-user-screen" />,
        children: [
            {
                path: '/users/create',
                element: (
                    <ScreenWrapper title="Criar usuário">
                        <LogicBaseProvider
                            base={attachToken(userFormBase, token)}
                        >
                            <UserForm />
                        </LogicBaseProvider>
                    </ScreenWrapper>
                ),
            },
        ],
    },
    {
        element: <CheckParams id={/^\d+$/} />,
        children: [
            {
                element: <Gate abilityName="show-user-screen" />,
                children: [
                    {
                        path: '/users/:id',
                        element: (
                            <ScreenWrapper title="Visão geral do Usuário">
                                <User />
                            </ScreenWrapper>
                        ),
                        loader: subjectShowLoader(
                            token,
                            (id) => `/api/users/${id}`
                        ),
                    },
                    {
                        path: '/users/removed/:id',
                        element: (
                            <ScreenWrapper title="Visão geral do Usuário">
                                <User removed />
                            </ScreenWrapper>
                        ),
                        loader: subjectShowLoader(
                            token,
                            (id) => `/api/users/removed/${id}`
                        ),
                    },
                ],
            },
        ],
    },
];
