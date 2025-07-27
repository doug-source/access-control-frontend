import { List } from '@/components/atoms/List';
import { TrashIcon } from '@/components/atoms/icons/TrashIcon';
import dataItemStyles from '@/shared/stylessheets/dataItem.module.scss';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { useDeps } from './shared/useDeps';

interface AbilityItemProps {
    ability: AbilityIndex;
}

export const AbilityItem = ({ ability }: AbilityItemProps) => {
    const [localHandler, navigate, endpoint] = useDeps();
    return (
        <List.Item
            className={dataItemStyles.item}
            onClick={() => navigate(`/abilities/${ability.id}`)}
        >
            <div className={dataItemStyles.itemText}>{ability.name}</div>
            <div className={dataItemStyles.iconBox}>
                <TrashIcon
                    show={endpoint === '/abilities'}
                    title="Remover"
                    className={iconStyles.iconSwing}
                    onClick={localHandler(ability)}
                />
            </div>
        </List.Item>
    );
};
