import { VerifyEmail } from '@/components/pages/VerifyEmail';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { attachToken } from '@/shared/utils/attachToken';
import { verifyEmailBase } from '@/shared/utils/globals/verifyEmail';

export const makeVerifyEmailRoutes = (token: string) => [
    {
        path: '/email/verify',
        element: (
            <LogicBaseProvider base={attachToken(verifyEmailBase, token)}>
                <VerifyEmail />
            </LogicBaseProvider>
        ),
    },
    {
        path: '/email/verify/:id/:hash',
        element: (
            <LogicBaseProvider base={attachToken(verifyEmailBase, token)}>
                <VerifyEmail />
            </LogicBaseProvider>
        ),
    },
];
