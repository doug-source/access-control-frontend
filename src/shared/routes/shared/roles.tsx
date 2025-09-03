import { Role } from '@/components/pages/Role';
import { RoleForm } from '@/components/pages/RoleForm';
import { Roles } from '@/components/pages/Roles';
import { RolesFromUser } from '@/components/pages/RolesFromUser';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { subjectShowLoader } from '@/shared/loaders/subjectShowLoader';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { attachToken } from '@/shared/utils/attachToken';
import { roleFormBase } from '@/shared/utils/globals/roleForm';

export const makeRoleRoutes = (token: string) => [
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
            {
                path: '/roles/user/:id',
                element: (
                    <ScreenWrapper title="Papéis">
                        <RolesFromUser />
                    </ScreenWrapper>
                ),
            },
            {
                path: '/roles/user/:id/attach',
                element: (
                    <ScreenWrapper title="Papéis">
                        <RolesFromUser />
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
                        <LogicBaseProvider
                            base={attachToken(roleFormBase, token)}
                        >
                            <RoleForm />
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
