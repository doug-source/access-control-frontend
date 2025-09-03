import { RegisterRequest } from '@/components/pages/RegisterRequest';
import { RegisterRequests } from '@/components/pages/RegisterRequests';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { subjectShowLoader } from '@/shared/loaders/subjectShowLoader';

export const makeRegisterRequestRoutes = (token: string) => [
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
        element: <CheckParams id={/^\d+$/} />,
        children: [
            {
                element: <Gate abilityName="show-register-request-screen" />,
                children: [
                    {
                        path: '/register-requests/:id',
                        element: (
                            <ScreenWrapper title="Visão geral do pedido">
                                <RegisterRequest />
                            </ScreenWrapper>
                        ),
                        loader: subjectShowLoader(token, (id) => {
                            return `/api/registers/requests/${id}`;
                        }),
                    },
                ],
            },
        ],
    },
];
