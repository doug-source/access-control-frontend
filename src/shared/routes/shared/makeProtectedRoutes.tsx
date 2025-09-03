import { MainLayout } from '@/components/templates/MainLayout';
import { AppTitle } from '@/shared/components/atoms/AppTitle';
import { makeAbilityRoutes } from './abilities';
import { makeConfigRoutes } from './config';
import { emailVerifyRoutes } from './multiple';
import { makeRegisterPermissionRoutes } from './registerPermissions';
import { makeRegisterRequestRoutes } from './registerRequests';
import { makeRoleRoutes } from './roles';
import { makeUserRoutes } from './users';

export const makeProtectedRoutes = (token: string) => [
    {
        element: <MainLayout />,
        children: [
            {
                path: '/home',
                element: <AppTitle />,
            },
            ...makeUserRoutes(token),
            ...makeRoleRoutes(token),
            ...makeRegisterRequestRoutes(token),
            ...makeRegisterPermissionRoutes(token),
            ...makeAbilityRoutes(token),
            ...makeConfigRoutes(token),
        ],
    },
    ...emailVerifyRoutes(token),
];
