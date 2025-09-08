import { User } from '@/components/pages/User';
import { Users } from '@/components/pages/Users';
import { remotionFromListAction } from '@/shared/actions/remotionFromListAction';
import { restorationFromListAction } from '@/shared/actions/restorationFromListAction';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { subjectShowLoader } from '@/shared/loaders/subjectShowLoader';
import { usersLoader } from '@/shared/loaders/usersLoader';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { attachToken } from '@/shared/utils/attachToken';
import { pageRequester, restorer } from '@/shared/utils/globals/generic';
import { userFormBase } from '@/shared/utils/globals/userForm';

export const makeUserRoutes = (token: string, id: number) => [
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
                loader: usersLoader(
                    pageRequester,
                    token,
                    '/users',
                    '/api/users',
                    'user',
                    id
                ),
            },
            {
                path: '/users/removed',
                element: (
                    <ScreenWrapper title="Usuários Removidos">
                        <Users.Removed />
                    </ScreenWrapper>
                ),
                loader: usersLoader(
                    pageRequester,
                    token,
                    '/users/removed',
                    '/api/users/removed',
                    'user-removed',
                    id
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
                            <User.Form />
                        </LogicBaseProvider>
                    </ScreenWrapper>
                ),
            },
        ],
    },
    {
        path: '/users/remove/:id',
        action: remotionFromListAction(
            pageRequester,
            token,
            (id) => `/api/users/${id}`,
            '/users'
        ),
    },
    {
        path: '/users/removed/remove/:id',
        action: remotionFromListAction(
            pageRequester,
            token,
            (id) => `/api/users/removed/${id}`,
            '/users/removed'
        ),
    },
    {
        path: '/users/restore/:id',
        action: restorationFromListAction(
            restorer,
            token,
            '/api/users/restore',
            '/users/removed'
        ),
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
