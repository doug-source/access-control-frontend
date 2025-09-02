import { useSignState } from '@/shared/hooks/useSignState';
import { makeRouteList } from '@/shared/routes';
import { createBrowserRouter, RouterProvider } from 'react-router';

export const BuildRoutes = () => {
    const token = useSignState().state.user?.token ?? '';
    const router = createBrowserRouter(makeRouteList(token));

    return <RouterProvider router={router} />;
};
