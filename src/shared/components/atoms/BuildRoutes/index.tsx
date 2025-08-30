import { useAuth } from '@/shared/hooks/useAuth';
import { makeRouteList } from '@/shared/routes';
import { createBrowserRouter, RouterProvider } from 'react-router';

export const BuildRoutes = () => {
    const token = useAuth()?.user?.token ?? '';
    const router = createBrowserRouter(makeRouteList(token));

    return <RouterProvider router={router} />;
};
