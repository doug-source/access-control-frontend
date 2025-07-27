import { ChangePassword } from '@/components/pages/ChangePassword';
import { ForgotPassword } from '@/components/pages/ForgotPassword';
import { Login } from '@/components/pages/Login';
import { RegisterAccount } from '@/components/pages/RegisterAccount';
import { RequestAccount } from '@/components/pages/RequestAccount';
import { providedLoader } from '@/shared/loaders/guest/providedLoader';
import { registerAccountLoader } from '@/shared/loaders/guest/registerAccountLoader';
import { requestAccountLoader } from '@/shared/loaders/guest/requestAccountLoader';
import { resetPasswordLoader } from '@/shared/loaders/guest/resetPasswordLoader';
import {
    authenticatorInstance,
    registerRequestMakerInstance,
} from '@/shared/utils/globals';

export const unprotectedRoutes = [
    {
        path: '/',
        element: <Login />,
        index: true,
        loader: providedLoader(authenticatorInstance),
    },
    {
        path: '/request',
        element: <RequestAccount />,
        loader: requestAccountLoader(registerRequestMakerInstance),
    },
    {
        path: '/register',
        element: <RegisterAccount />,
        loader: registerAccountLoader,
    },
    {
        path: '/forgot',
        element: <ForgotPassword />,
    },
    {
        path: '/change-pass',
        element: <ChangePassword />,
        loader: resetPasswordLoader,
    },
];
