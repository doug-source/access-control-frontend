import { MainLayout } from '@/components/templates/MainLayout';
import { AppTitle } from '@/shared/components/atoms/AppTitle';
import type { RouteObject } from 'react-router';
import { makeAbilityRoutes } from './abilities';
import { makeConfigRoutes } from './config';
import { makeRegisterPermissionRoutes } from './registerPermissions';
import { makeRegisterRequestRoutes } from './registerRequests';
import { makeRoleRoutes } from './roles';
import { makeUserRoutes } from './users';
import { makeVerifyEmailRoutes } from './verifyEmail';

export const makeProtectedRoutes = (token: string, id: number) => {
    let routes: RouteObject[] = [];
    if (token) {
        routes = [
            ...makeUserRoutes(token, id),
            ...makeRoleRoutes(token, id),
            ...makeRegisterRequestRoutes(token, id),
            ...makeRegisterPermissionRoutes(token, id),
            ...makeAbilityRoutes(token, id),
            ...makeConfigRoutes(token),
        ];
    }

    return [
        {
            element: <MainLayout />,
            children: [
                {
                    path: '/home',
                    element: <AppTitle />,
                },
                ...routes,
            ],
        },
        ...makeVerifyEmailRoutes(token),
    ];
};
