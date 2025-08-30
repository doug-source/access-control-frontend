import { App } from '@/App';
import { ErrorPage } from '@/components/pages/ErrorPage';
import { NotFound } from '@/components/pages/NotFound';
import { Guest } from '@/shared/components/molecules/Guest';
import { WrapAppProviders } from '@/shared/providers/WrapAppProviders';
import { WrapGuestProviders } from '@/shared/providers/WrapGuestProviders';
import { makeProtectedRoutes } from '@/shared/routes/shared/makeProtectedRoutes';
import { unprotectedRoutes } from '@/shared/routes/shared/unprotected';
import type { RouteObject } from 'react-router';
import { ScreenWrapper } from '../components/molecules/ScreenWrapper';

export const makeRouteList = (token: string): RouteObject[] => [
    {
        element: (
            <WrapGuestProviders>
                <Guest />
            </WrapGuestProviders>
        ),
        children: unprotectedRoutes,
    },
    {
        element: (
            <WrapAppProviders token={token}>
                <App />
            </WrapAppProviders>
        ),
        children: makeProtectedRoutes(token),
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
