import { Abilities } from '@/components/pages/Abilities';
// import { AbilitiesFromUser } from '@/components/pages/AbilitiesFromUser';
import { Ability } from '@/components/pages/Ability';
import { attachFromListAction } from '@/shared/actions/attachFromListAction';
import { detachFromListAction } from '@/shared/actions/detachFromListAction';
import { remotionFromListAction } from '@/shared/actions/remotionFromListAction';
import { CheckParams } from '@/shared/components/molecules/CheckParams';
import { ScreenWrapper } from '@/shared/components/molecules/ScreenWrapper';
import { Gate } from '@/shared/components/organisms/Gate';
import { abilitiesLoader } from '@/shared/loaders/abilitiesLoader';
import { subjectShowLoader } from '@/shared/loaders/subjectShowLoader';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { attachToken } from '@/shared/utils/attachToken';
import { abilityFormBase } from '@/shared/utils/globals/abilityForm';
import {
    pageRequester,
    permissionsRequester,
} from '@/shared/utils/globals/generic';
import { viewerInstance } from '@/shared/utils/globals/viewer';

export const makeAbilityRoutes = (token: string, id: number) => [
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
                loader: abilitiesLoader(
                    pageRequester,
                    viewerInstance,
                    token,
                    () => '/abilities',
                    () => '/api/abilities',
                    'ability',
                    id
                ),
            },
            {
                path: '/abilities/remove/:id',
                action: remotionFromListAction(
                    pageRequester,
                    token,
                    (id) => `/api/abilities/${id}`,
                    '/abilities'
                ),
            },
            {
                element: <CheckParams id={/^\d+$/} />,
                children: [
                    {
                        path: '/abilities/user/:id',
                        element: (
                            <ScreenWrapper title="Habilidades">
                                <Abilities.FromUser />
                            </ScreenWrapper>
                        ),
                        loader: abilitiesLoader(
                            pageRequester,
                            viewerInstance,
                            token,
                            (id) => `/abilities/user/${id}`,
                            (id) => `/api/users/${id}/abilities`,
                            'ability-from-user',
                            id
                        ),
                        // action para detach
                        action: detachFromListAction(
                            permissionsRequester,
                            token,
                            (id) => `/api/users/${id}/abilities`,
                            (id) => `/abilities/user/${id}`
                        ),
                    },
                    {
                        path: '/abilities/user/:id/attach',
                        element: (
                            <ScreenWrapper title="Habilidades">
                                <Abilities.FromUser />
                            </ScreenWrapper>
                        ),
                        loader: abilitiesLoader(
                            pageRequester,
                            viewerInstance,
                            token,
                            (id) => `/abilities/user/${id}/attach`,
                            (id) => `/api/users/${id}/abilities`,
                            'ability-from-user-attach',
                            id
                        ),
                        // action para attach
                        action: attachFromListAction(
                            permissionsRequester,
                            token,
                            (id) => `/api/users/${id}/abilities`,
                            (id) => `/abilities/user/${id}/attach`
                        ),
                    },
                    {
                        path: '/abilities/role/:id',
                        element: (
                            <ScreenWrapper title="Habilidades">
                                <Abilities.FromRole />
                            </ScreenWrapper>
                        ),
                        loader: abilitiesLoader(
                            pageRequester,
                            viewerInstance,
                            token,
                            (id) => `/abilities/role/${id}`,
                            (id) => `/api/roles/${id}/abilities`,
                            'ability-from-role',
                            id
                        ),
                        // action para detach
                        action: detachFromListAction(
                            permissionsRequester,
                            token,
                            (id) => `/api/roles/${id}/abilities`,
                            (id) => `/abilities/role/${id}`
                        ),
                    },
                    {
                        path: '/abilities/role/:id/attach',
                        element: (
                            <ScreenWrapper title="Habilidades">
                                <Abilities.FromRole />
                            </ScreenWrapper>
                        ),
                        loader: abilitiesLoader(
                            pageRequester,
                            viewerInstance,
                            token,
                            (id) => `/abilities/role/${id}/attach`,
                            (id) => `/api/roles/${id}/abilities`,
                            'ability-from-role-attach',
                            id
                        ),
                        // action para attach
                        action: attachFromListAction(
                            permissionsRequester,
                            token,
                            (id) => `/api/roles/${id}/abilities`,
                            (id) => `/abilities/role/${id}/attach`
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
                            <Ability.Form />
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
