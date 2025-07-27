import { TrashIcon } from '@/components/atoms/icons/TrashIcon';
import { UndoIcon } from '@/components/atoms/icons/UndoIcon';
import { List } from '@/components/atoms/List';
import dataItemStyles from '@/shared/stylessheets/dataItem.module.scss';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import { type UserIndex } from '@/shared/types/Models/User';
import { useDeps } from './shared/useDeps';

interface UserRemovedItemProps {
    user: UserIndex;
}

export const UserRemovedItem = ({ user }: UserRemovedItemProps) => {
    const { remotionHandler, restorationHandler, navigate } = useDeps();
    return (
        <List.Item
            className={dataItemStyles.item}
            onClick={() => navigate(`/users/removed/${user.id}`)}
        >
            <div className={dataItemStyles.itemText}>{user.name}</div>
            <div className={dataItemStyles.iconBox}>
                <UndoIcon
                    title="Restaurar"
                    className={iconStyles.iconSwing}
                    onClick={restorationHandler(user)}
                    show
                />
                <TrashIcon
                    title="Remover"
                    className={iconStyles.iconSwing}
                    onClick={remotionHandler(user)}
                />
            </div>
        </List.Item>
    );
};
