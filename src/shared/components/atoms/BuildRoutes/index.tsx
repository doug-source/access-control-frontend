import { useSignState } from '@/shared/hooks/useSignState';
import { makeRouteList } from '@/shared/routes';
import { createBrowserRouter, RouterProvider } from 'react-router';

export const BuildRoutes = () => {
    const user = useSignState().state.user;
    const token = user?.token ?? '';
    const id = Number(user?.id ?? 0);
    const router = createBrowserRouter(makeRouteList(token, id));

    return <RouterProvider router={router} />;
};
