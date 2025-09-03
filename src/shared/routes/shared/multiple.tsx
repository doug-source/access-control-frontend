import { VerifyEmail } from '@/components/pages/VerifyEmail';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { attachToken } from '@/shared/utils/attachToken';
import { verifyEmailBase } from '@/shared/utils/globals/verifyEmail';
import { type RouteObject } from 'react-router';

export const emailVerifyRoutes = (token: string): RouteObject[] => {
    const verifyEmailComponent = (
        <LogicBaseProvider base={attachToken(verifyEmailBase, token)}>
            <VerifyEmail />
        </LogicBaseProvider>
    );
    return [
        {
            path: '/email/verify',
            element: verifyEmailComponent,
        },
        {
            path: '/email/verify/:id/:hash',
            element: verifyEmailComponent,
        },
    ];
};
