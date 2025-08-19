import { ChangePassword } from '@/components/pages/ChangePassword';
import { ForgotPassword } from '@/components/pages/ForgotPassword';
import { Login } from '@/components/pages/Login';
import { RegisterAccount } from '@/components/pages/RegisterAccount';
import { RequestAccount } from '@/components/pages/RequestAccount';
import { loginProvidedLoader } from '@/shared/loaders/loginProvidedLoader';
import { registerAccountLoader } from '@/shared/loaders/registerAccountLoader';
import { requestAccountLoader } from '@/shared/loaders/requestAccountLoader';
import { resetPasswordLoader } from '@/shared/loaders/resetPasswordLoader';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { forgotPasswordBase } from '@/shared/utils/globals/forgotPassword';
import { loginBase } from '@/shared/utils/globals/login';
import { registerAccountBase } from '@/shared/utils/globals/registerAccount';
import { requestAccountBase } from '@/shared/utils/globals/requestAccount';
import { resetPasswordBase } from '@/shared/utils/globals/resetPassword';

export const unprotectedRoutes = [
    {
        path: '/',
        element: (
            <LogicBaseProvider base={loginBase}>
                <Login />
            </LogicBaseProvider>
        ),
        index: true,
        loader: loginProvidedLoader(loginBase.dispatcher),
    },
    {
        path: '/request',
        element: (
            <LogicBaseProvider base={requestAccountBase}>
                <RequestAccount />
            </LogicBaseProvider>
        ),
        loader: requestAccountLoader(requestAccountBase.dispatcher),
    },
    {
        path: '/register',
        element: (
            <LogicBaseProvider base={registerAccountBase}>
                <RegisterAccount />
            </LogicBaseProvider>
        ),
        loader: registerAccountLoader(registerAccountBase.dispatcher),
    },
    {
        path: '/forgot',
        element: (
            <LogicBaseProvider base={forgotPasswordBase}>
                <ForgotPassword />
            </LogicBaseProvider>
        ),
    },
    {
        path: '/change-pass',
        element: (
            <LogicBaseProvider base={resetPasswordBase}>
                <ChangePassword />
            </LogicBaseProvider>
        ),
        loader: resetPasswordLoader(resetPasswordBase.dispatcher),
    },
];
