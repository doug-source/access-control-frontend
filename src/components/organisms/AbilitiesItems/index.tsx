import { List } from '@/components/atoms/List';
import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type ComponentType } from 'react';

interface AbilitiesItemsItemProps {
    ability: AbilityIndex;
}

interface AbilitiesItemsProps {
    items: AbilityIndex[];
    item: ComponentType<AbilitiesItemsItemProps>;
}

export const AbilitiesItems = ({ items, item: Item }: AbilitiesItemsProps) => {
    if (items.length === 0) {
        return <List.Empty />;
    }
    return (
        <>
            {items.map((ability) => (
                <Item key={ability.id} ability={ability} />
            ))}
        </>
    );
};
