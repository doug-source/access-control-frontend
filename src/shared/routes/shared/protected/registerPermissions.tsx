import { RegisterPermission } from '@/components/pages/RegisterPermission';
import { RegisterPermissions } from '@/components/pages/RegisterPermissions';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { subjectShowLoader } from '@/shared/loaders/subjectShowLoader';

export const makeRegisterPermissionRoutes = (token: string) => [
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
        element: <CheckParams id={/^\d+$/} />,
        children: [
            {
                element: <Gate abilityName="show-register-permission-screen" />,
                children: [
                    {
                        path: '/register-permissions/:id',
                        element: (
                            <ScreenWrapper title="Visão geral da permissão">
                                <RegisterPermission />
                            </ScreenWrapper>
                        ),
                        loader: subjectShowLoader(token, (id) => {
                            return `/api/registers/permissions/${id}`;
                        }),
                    },
                ],
            },
        ],
    },
];
