import { Role } from '@/components/pages/Role';
import { Roles } from '@/components/pages/Roles';
import { attachFromListAction } from '@/shared/actions/attachFromListAction';
import { detachFromListAction } from '@/shared/actions/detachFromListAction';
import { remotionFromListAction } from '@/shared/actions/remotionFromListAction';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { rolesLoader } from '@/shared/loaders/rolesLoader';
import { subjectShowLoader } from '@/shared/loaders/subjectShowLoader';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { attachToken } from '@/shared/utils/attachToken';
import {
    pageRequester,
    permissionsRequester,
} from '@/shared/utils/globals/generic';
import { roleFormBase } from '@/shared/utils/globals/roleForm';
import { viewerInstance } from '@/shared/utils/globals/viewer';

export const makeRoleRoutes = (token: string, id: number) => [
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
                loader: rolesLoader(
                    pageRequester,
                    viewerInstance,
                    token,
                    () => '/roles',
                    () => '/api/roles',
                    'role',
                    id
                ),
            },
            {
                path: '/roles/remove/:id',
                action: remotionFromListAction(
                    pageRequester,
                    token,
                    (id) => `/api/roles/${id}`,
                    '/roles'
                ),
            },
            {
                path: '/roles/user/:id',
                element: (
                    <ScreenWrapper title="Papéis">
                        <Roles.FromUser />
                    </ScreenWrapper>
                ),
                loader: rolesLoader(
                    pageRequester,
                    viewerInstance,
                    token,
                    (id) => `/roles/user/${id}`,
                    (id) => `/api/users/${id}/roles`,
                    'role-from-user',
                    id
                ),
                // action para detach
                action: detachFromListAction(
                    permissionsRequester,
                    token,
                    (id) => `/api/users/${id}/roles`,
                    (id) => `/roles/user/${id}`
                ),
            },
            {
                path: '/roles/user/:id/attach',
                element: (
                    <ScreenWrapper title="Papéis">
                        <Roles.FromUser />
                    </ScreenWrapper>
                ),
                loader: rolesLoader(
                    pageRequester,
                    viewerInstance,
                    token,
                    (id) => `/roles/user/${id}/attach`,
                    (id) => `/api/users/${id}/roles`,
                    'role-from-user-attach',
                    id
                ),
                // action para attach
                action: attachFromListAction(
                    permissionsRequester,
                    token,
                    (id) => `/api/users/${id}/roles`,
                    (id) => `/roles/user/${id}/attach`
                ),
            },
        ],
    },
    {
        element: <Gate abilityName="add-role-screen" />,
        children: [
            {
                path: '/roles/create',
                element: (
                    <ScreenWrapper title="Criar Papel">
                        <LogicBaseProvider
                            base={attachToken(roleFormBase, token)}
                        >
                            <Role.Form />
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
                element: <Gate abilityName="show-role-screen" />,
                children: [
                    {
                        path: '/roles/:id',
                        element: (
                            <ScreenWrapper title="Visão geral do papel">
                                <Role />
                            </ScreenWrapper>
                        ),
                        loader: subjectShowLoader(
                            token,
                            (id) => `/api/roles/${id}`
                        ),
                    },
                ],
            },
        ],
    },
];
