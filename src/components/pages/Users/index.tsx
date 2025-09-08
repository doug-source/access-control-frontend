import { PlusLink } from '@/components/molecules/PlusLink';
import { UserItem } from '@/components/organisms/UserItem';
import { UserRemovedItem } from '@/components/organisms/UserRemovedItem';
import { UsersTemplate } from '@/components/templates/UsersTemplate';
import { useSignState } from '@/shared/hooks/useSignState';

export const Users = () => {
    const { state } = useSignState();
    const abilities = state.user?.abilities ?? [];
    return (
        <UsersTemplate
            item={UserItem}
            navigation="/users"
            tools={
                <PlusLink
                    show={abilities.includes('add-user-screen')}
                    to="/users/create"
                    title="Criar usuário"
                />
            }
        />
    );
};

Users.Removed = () => (
    <UsersTemplate item={UserRemovedItem} navigation="/users/removed" />
);
