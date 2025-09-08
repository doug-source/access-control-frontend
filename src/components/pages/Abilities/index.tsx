import { PaginationPurpose } from '@/components/atoms/PaginationPurpose';
import { PlusLink } from '@/components/molecules/PlusLink';
import { AbilityItem } from '@/components/organisms/AbilityItem';
import { AbilitiesTemplate } from '@/components/templates/AbilitiesTemplate';
import { useSignState } from '@/shared/hooks/useSignState';
import { Suspense } from 'react';
import { Await } from 'react-router';
import { useFromRoleDeps } from './shared/useFromRoleDeps';
import { useFromUserDeps } from './shared/useFromUserDeps';

export const Abilities = () => {
    const abilities = useSignState().state.user?.abilities ?? [];
    return (
        <AbilitiesTemplate
            navigation="/abilities"
            item={AbilityItem}
            tools={
                <PlusLink
                    show={abilities.includes('add-ability-screen')}
                    to="/abilities/create"
                    title="Criar habilidade"
                />
            }
        />
    );
};

const FromUser = () => {
    const [navigation, info, label] = useFromUserDeps();
    return (
        <AbilitiesTemplate
            navigation={navigation}
            item={AbilityItem.FromUser}
            remain={
                <Suspense
                    fallback={<PaginationPurpose.Fallback label={label} />}
                >
                    <Await resolve={info}>
                        {(res) => (
                            <PaginationPurpose
                                show={Boolean(res?.body)}
                                label={label}
                                value={res?.body.name ?? '--'}
                            />
                        )}
                    </Await>
                </Suspense>
            }
        />
    );
};

Abilities.FromUser = FromUser;

const FromRole = () => {
    const [navigation, info, label] = useFromRoleDeps();
    return (
        <AbilitiesTemplate
            navigation={navigation}
            item={AbilityItem.FromRole}
            remain={
                <Suspense
                    fallback={<PaginationPurpose.Fallback label={label} />}
                >
                    <Await resolve={info}>
                        {(res) => (
                            <PaginationPurpose
                                show={Boolean(res?.body)}
                                label={label}
                                value={res?.body.name ?? '--'}
                            />
                        )}
                    </Await>
                </Suspense>
            }
        />
    );
};

Abilities.FromRole = FromRole;
