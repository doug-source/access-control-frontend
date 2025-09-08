import { PaginationPurpose } from '@/components/atoms/PaginationPurpose';
import { PlusLink } from '@/components/molecules/PlusLink';
import { RoleItem } from '@/components/organisms/RoleItem';
import { RolesTemplate } from '@/components/templates/RolesTemplate';
import { useSignState } from '@/shared/hooks/useSignState';
import { Suspense } from 'react';
import { Await } from 'react-router';
import { useDeps } from './shared/useDeps';

export const Roles = () => {
    const abilities = useSignState().state.user?.abilities ?? [];
    return (
        <RolesTemplate
            item={RoleItem}
            navigation="/roles"
            tools={
                <PlusLink
                    show={abilities.includes('add-role-screen')}
                    to="/roles/create"
                    title="Criar papel"
                />
            }
        />
    );
};

const FromUser = () => {
    const [navigation, info, label] = useDeps();
    return (
        <RolesTemplate
            item={RoleItem.FromUser}
            navigation={navigation}
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
Roles.FromUser = FromUser;
