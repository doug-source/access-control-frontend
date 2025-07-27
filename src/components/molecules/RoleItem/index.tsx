import { AbilitiesIcon } from '@/components/atoms/icons/AbilitiesIcon';
import { AttachIcon } from '@/components/atoms/icons/AttachIcon';
import { TrashIcon } from '@/components/atoms/icons/TrashIcon';
import { List } from '@/components/atoms/List';
import dataItemStyles from '@/shared/stylessheets/dataItem.module.scss';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { useDeps } from './shared/useDeps';

type RoleItemProps = {
    role: RoleIndex;
};

export const RoleItem = ({ role }: RoleItemProps) => {
    const {
        removeHandler,
        abilitiesHandler,
        abilitiesToAttachHandler,
        navigate,
    } = useDeps(role);

    return (
        <List.Item
            className={dataItemStyles.item}
            onClick={() => navigate(`/roles/${role.id}`)}
        >
            <div className={dataItemStyles.itemText}>{role.name}</div>
            <div className={dataItemStyles.iconBox}>
                <AttachIcon
                    className={iconStyles.iconSwing}
                    title="Vincular"
                    onClick={abilitiesToAttachHandler(role)}
                />
                <AbilitiesIcon
                    className={iconStyles.iconSwing}
                    title="Habilidades"
                    onClick={abilitiesHandler(role)}
                />
                <TrashIcon
                    className={iconStyles.iconSwing}
                    onClick={removeHandler}
                />
            </div>
        </List.Item>
    );
};
