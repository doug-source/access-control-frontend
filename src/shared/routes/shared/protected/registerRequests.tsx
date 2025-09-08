import { RegisterRequest } from '@/components/pages/RegisterRequest';
import { RegisterRequests } from '@/components/pages/RegisterRequests';
import { approvalFromListAction } from '@/shared/actions/approvalFromListAction';
import { remotionFromListAction } from '@/shared/actions/remotionFromListAction';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { registerRequestsLoader } from '@/shared/loaders/registerRequestsLoader';
import { subjectShowLoader } from '@/shared/loaders/subjectShowLoader';
import { approver } from '@/shared/utils/globals/generic';

export const makeRegisterRequestRoutes = (token: string, id: number) => [
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
                loader: registerRequestsLoader(
                    approver,
                    token,
                    '/register-requests',
                    '/api/registers/requests',
                    'register-request',
                    id
                ),
            },
        ],
    },
    {
        path: '/register/requests/remove/:id',
        action: remotionFromListAction(
            approver,
            token,
            (id) => `/api/registers/requests/${id}`,
            '/register-requests'
        ),
    },
    {
        path: '/register/requests/approval/:id',
        action: approvalFromListAction(
            approver,
            token,
            (id) => `/api/registers/requests/${id}/approval`,
            '/register-requests'
        ),
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
