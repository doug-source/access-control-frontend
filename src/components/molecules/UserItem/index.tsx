import { List } from '@/components/atoms/List';
import { AbilitiesIcon } from '@/components/atoms/icons/AbilitiesIcon';
import { AttachIcon } from '@/components/atoms/icons/AttachIcon';
import { RolesIcon } from '@/components/atoms/icons/RolesIcon';
import { TrashIcon } from '@/components/atoms/icons/TrashIcon';
import dataItemStyles from '@/shared/stylessheets/dataItem.module.scss';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import { type UserIndex } from '@/shared/types/Models/User';
import classNames from 'classnames';
import styles from './UserItem.module.scss';
import { useDeps } from './shared/useDeps';

interface UserItemProps {
    user: UserIndex;
}

export const UserItem = ({ user }: UserItemProps) => {
    const {
        attachHandler,
        abilitiesHandler,
        rolesHandler,
        remotionHandler,
        isCurrentUser,
        navigate,
        trashBtnId,
        attachBtnId,
    } = useDeps(user);
    return (
        <List.Item
            className={dataItemStyles.item}
            onClick={() => navigate(`/users/${user.id}`)}
        >
            <div className={dataItemStyles.itemText}>{user.name}</div>
            <div className={dataItemStyles.iconBox}>
                <button
                    type="button"
                    className={styles.iconBtn}
                    aria-describedby={attachBtnId}
                    onClick={attachHandler}
                >
                    <AttachIcon
                        title="Vincular"
                        className={iconStyles.iconSwing}
                    />
                    <span id={attachBtnId} className="screen-reader-only">
                        Botão para vincular papéis ou habilidades ao usuário{' '}
                        {user.name}.
                    </span>
                </button>
                <AbilitiesIcon
                    title="Habilidades"
                    className={iconStyles.iconSwing}
                    onClick={abilitiesHandler(user)}
                />
                <RolesIcon
                    title="Papéis"
                    className={iconStyles.iconSwing}
                    onClick={rolesHandler(user)}
                />
                <button
                    type="button"
                    className={classNames(
                        styles.iconBtn,
                        isCurrentUser(user) && styles.trashDisabled
                    )}
                    aria-describedby={trashBtnId}
                    onClick={remotionHandler(user)}
                >
                    <TrashIcon
                        title="Remover"
                        className={iconStyles.iconSwing}
                    />
                    <span id={trashBtnId} className="screen-reader-only">
                        Botão para remover o usuário {user.name}.
                    </span>
                </button>
            </div>
        </List.Item>
    );
};
