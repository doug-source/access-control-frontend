import { MainLayout } from '@/components/templates/MainLayout';
import { AppTitle } from '@/shared/components/atoms/AppTitle';
import { makeAbilityRoutes } from './abilities';
import { makeConfigRoutes } from './config';
import { makeRegisterPermissionRoutes } from './registerPermissions';
import { makeRegisterRequestRoutes } from './registerRequests';
import { makeRoleRoutes } from './roles';
import { makeUserRoutes } from './users';
import { makeVerifyEmailRoutes } from './verifyEmail';

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
    ...makeVerifyEmailRoutes(token),
];
