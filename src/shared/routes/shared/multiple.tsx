import { Abilities } from '@/components/pages/Abilities';
import { AbilitiesFromRole } from '@/components/pages/AbilitiesFromRole';
import { AbilitiesFromUser } from '@/components/pages/AbilitiesFromUser';
import { RolesFromUser } from '@/components/pages/RolesFromUser';
import { VerifyEmail } from '@/components/pages/VerifyEmail';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { emailVerifyLoader } from '@/shared/loaders/emailVerifyLoader';
import { type RouteObject } from 'react-router';

export const emailVerifyRoutes = (): RouteObject[] => {
    const verifyEmailComponent = <VerifyEmail />;
    return [
        {
            path: '/email/verify',
            element: verifyEmailComponent,
            loader: emailVerifyLoader,
        },
        {
            path: '/email/verify/:id/:hash',
            element: verifyEmailComponent,
            loader: emailVerifyLoader,
        },
    ];
};

export const abilityRoutes = (): RouteObject[] => {
    const abilityFromRoleComponent = (
        <ScreenWrapper title="Habilidades">
            <AbilitiesFromRole />
        </ScreenWrapper>
    );
    const abilityFromUserComponent = (
        <ScreenWrapper title="Habilidades">
            <AbilitiesFromUser />
        </ScreenWrapper>
    );

    return [
        {
            element: <Gate abilityName="ability-screen" />,
            children: [
                {
                    path: '/abilities',
                    element: (
                        <ScreenWrapper title="Habilidades">
                            <Abilities />
                        </ScreenWrapper>
                    ),
                },
                {
                    path: '/abilities/role/:id',
                    element: abilityFromRoleComponent,
                },
                {
                    path: '/abilities/role/:id/attach',
                    element: abilityFromRoleComponent,
                },
                {
                    path: '/abilities/user/:id',
                    element: abilityFromUserComponent,
                },
                {
                    path: '/abilities/user/:id/attach',
                    element: abilityFromUserComponent,
                },
            ],
        },
    ];
};

export const rolesFromUserRoutes = (): RouteObject[] => {
    const component = (
        <ScreenWrapper title="Papéis">
            <RolesFromUser />
        </ScreenWrapper>
    );
    return [
        {
            element: <Gate abilityName="role-screen" />,
            children: [
                {
                    path: '/roles/user/:id',
                    element: component,
                },
                {
                    path: '/roles/user/:id/attach',
                    element: component,
                },
            ],
        },
    ];
};
