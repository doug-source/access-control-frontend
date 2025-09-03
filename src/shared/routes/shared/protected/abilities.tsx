import { Abilities } from '@/components/pages/Abilities';
import { AbilitiesFromRole } from '@/components/pages/AbilitiesFromRole';
import { AbilitiesFromUser } from '@/components/pages/AbilitiesFromUser';
import { Ability } from '@/components/pages/Ability';
import { AbilityForm } from '@/components/pages/AbilityForm';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { subjectShowLoader } from '@/shared/loaders/subjectShowLoader';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { attachToken } from '@/shared/utils/attachToken';
import { abilityFormBase } from '@/shared/utils/globals/abilityForm';

export const makeAbilityRoutes = (token: string) => [
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
                element: <CheckParams id={/^\d+$/} />,
                children: [
                    {
                        path: '/abilities/user/:id',
                        element: (
                            <ScreenWrapper title="Habilidades">
                                <AbilitiesFromUser />
                            </ScreenWrapper>
                        ),
                    },
                    {
                        path: '/abilities/user/:id/attach',
                        element: (
                            <ScreenWrapper title="Habilidades">
                                <AbilitiesFromUser />
                            </ScreenWrapper>
                        ),
                    },
                    {
                        path: '/abilities/role/:id',
                        element: (
                            <ScreenWrapper title="Habilidades">
                                <AbilitiesFromRole />
                            </ScreenWrapper>
                        ),
                    },
                    {
                        path: '/abilities/role/:id/attach',
                        element: (
                            <ScreenWrapper title="Habilidades">
                                <AbilitiesFromRole />
                            </ScreenWrapper>
                        ),
                    },
                ],
            },
        ],
    },
    {
        element: <Gate abilityName="add-ability-screen" />,
        children: [
            {
                path: '/abilities/create',
                element: (
                    <ScreenWrapper title="Criar Habilidade">
                        <LogicBaseProvider
                            base={attachToken(abilityFormBase, token)}
                        >
                            <AbilityForm />
                        </LogicBaseProvider>
                    </ScreenWrapper>
                ),
            },
        ],
    },
    {
        element: <CheckParams id={/^\d+$/} />,
        children: [
            {
                element: <Gate abilityName="show-ability-screen" />,
                children: [
                    {
                        path: '/abilities/:id',
                        element: (
                            <ScreenWrapper title="Visão geral da habilidade">
                                <Ability />
                            </ScreenWrapper>
                        ),
                        loader: subjectShowLoader(
                            token,
                            (id) => `/api/abilities/${id}`
                        ),
                    },
                ],
            },
        ],
    },
];
