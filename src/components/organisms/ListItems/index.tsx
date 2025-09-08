import { List } from '@/components/atoms/List';
import type { ComponentType } from 'react';

interface ListItemsProps<T> {
    items: T[];
    item: ComponentType<{
        data: T;
    }>;
}

export const ListItems = <T extends { id: number }>({
    items,
    item: Item,
}: ListItemsProps<T>) => {
    if (items.length === 0) {
        return <List.Empty />;
    }
    return (
        <>
            {items.map((d) => (
                <Item key={d.id} data={d} />
            ))}
        </>
    );
};
