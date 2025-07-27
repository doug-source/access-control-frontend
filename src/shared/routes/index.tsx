import { App } from '@/App';
import { NotFound } from '@/components/pages/NotFound';
import { Guest } from '@/shared/components/molecules/Guest';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { WrapAppProviders } from '@/shared/providers/WrapAppProviders';
import { WrapGuestProviders } from '@/shared/providers/WrapGuestProviders';
import { protectedRoutes } from '@/shared/routes/shared/protected';
import { unprotectedRoutes } from '@/shared/routes/shared/unprotected';
import { type RouteObject, Outlet } from 'react-router';

export const routeList: RouteObject[] = [
    {
        element: (
            <AuthProvider>
                <Outlet />
            </AuthProvider>
        ),
        children: [
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
                    <WrapAppProviders>
                        <App />
                    </WrapAppProviders>
                ),
                children: protectedRoutes,
            },
        ],
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
