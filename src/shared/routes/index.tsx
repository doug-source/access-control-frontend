import { App } from '@/App';
import { ErrorPage } from '@/components/pages/ErrorPage';
import { NotFound } from '@/components/pages/NotFound';
import { Guest } from '@/shared/components/molecules/Guest';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { UnauthenticatorProvider } from '@/shared/providers/UnauthenticatorProvider';
import { makeProtectedRoutes } from '@/shared/routes/shared/protected';
import { unprotectedRoutes } from '@/shared/routes/shared/unprotected';
import type { RouteObject } from 'react-router';

export const makeRouteList = (token: string, id: number): RouteObject[] => [
    {
        element: <Guest />,
        children: unprotectedRoutes,
    },
    {
        element: (
            <UnauthenticatorProvider token={token}>
                <App />
            </UnauthenticatorProvider>
        ),
        children: makeProtectedRoutes(token, id),
        errorElement: (
            <ScreenWrapper title="Oops">
                <ErrorPage />
            </ScreenWrapper>
        ),
    },
    {
        path: '/not-found',
        element: <NotFound />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];
