import { AttachIcon } from '@/components/atoms/icons/AttachIcon';
import { DetachIcon } from '@/components/atoms/icons/DetachIcon';
import { List } from '@/components/atoms/List';
import dataItemStyles from '@/shared/stylessheets/dataItem.module.scss';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { useDeps } from './shared/useDeps';

interface AbilityFromSubjectItemProps {
    ability: AbilityIndex;
}

export const AbilityFromSubjectItem = ({
    ability,
}: AbilityFromSubjectItemProps) => {
    const { localHandler, navigate, pathname } = useDeps();
    return (
        <List.Item
            className={dataItemStyles.item}
            onClick={() => navigate(`/abilities/${ability.id}`)}
        >
            <div className={dataItemStyles.itemText}>{ability.name}</div>
            <div className={dataItemStyles.iconBox}>
                <AttachIcon
                    show={pathname.endsWith('/attach')}
                    title="Vincular"
                    className={iconStyles.iconSwing}
                    onClick={localHandler(ability)}
                />
                <DetachIcon
                    show={!pathname.endsWith('/attach')}
                    title="Desvincular"
                    className={iconStyles.iconSwing}
                    onClick={localHandler(ability)}
                />
            </div>
        </List.Item>
    );
};
