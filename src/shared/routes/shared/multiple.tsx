import { Abilities } from '@/components/pages/Abilities';
import { AbilitiesFromRole } from '@/components/pages/AbilitiesFromRole';
import { AbilitiesFromUser } from '@/components/pages/AbilitiesFromUser';
import { VerifyEmail } from '@/components/pages/VerifyEmail';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { attachToken } from '@/shared/utils/attachToken';
import { verifyEmailBase } from '@/shared/utils/globals/verifyEmail';
import { type RouteObject } from 'react-router';

export const emailVerifyRoutes = (token: string): RouteObject[] => {
    const verifyEmailComponent = (
        <LogicBaseProvider base={attachToken(verifyEmailBase, token)}>
            <VerifyEmail />
        </LogicBaseProvider>
    );
    return [
        {
            path: '/email/verify',
            element: verifyEmailComponent,
        },
        {
            path: '/email/verify/:id/:hash',
            element: verifyEmailComponent,
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
