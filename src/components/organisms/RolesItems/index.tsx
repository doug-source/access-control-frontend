import { List } from '@/components/atoms/List';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { type ComponentType } from 'react';

type RolesItemsProps = {
    items: RoleIndex[];
    item: ComponentType<{
        role: RoleIndex;
    }>;
};

export const RolesItems = ({ items, item: Item }: RolesItemsProps) => {
    if (items.length === 0) {
        return <List.Empty />;
    }
    return (
        <>
            {items.map((role) => (
                <Item key={role.id} role={role} />
            ))}
        </>
    );
};
