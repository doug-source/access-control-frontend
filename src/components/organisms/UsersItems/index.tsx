import { List } from '@/components/atoms/List';
import { type UserIndex } from '@/shared/types/Models/User';
import { type ComponentType } from 'react';

type UsersItemsProps = {
    items: UserIndex[];
    item: ComponentType<{
        user: UserIndex;
    }>;
};

export const UsersItems = ({ items, item: Item }: UsersItemsProps) => {
    if (items.length === 0) {
        return <List.Empty />;
    }
    return (
        <>
            {items.map((user) => (
                <Item key={user.id} user={user} />
            ))}
        </>
    );
};
