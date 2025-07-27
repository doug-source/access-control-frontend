import { AttachIcon } from '@/components/atoms/icons/AttachIcon';
import { DetachIcon } from '@/components/atoms/icons/DetachIcon';
import { List } from '@/components/atoms/List';
import dataItemStyles from '@/shared/stylessheets/dataItem.module.scss';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { ComponentPropsWithoutRef } from 'react';
import { useDeps } from './shared/useDeps';

interface RoleFromUserItemProps
    extends Omit<ComponentPropsWithoutRef<typeof List.Item>, 'role'> {
    role: RoleIndex;
}

export const RoleFromUserItem = ({
    role,
    ...remain
}: RoleFromUserItemProps) => {
    const { detachHandler, attachHandler, navigate, pathname } = useDeps();
    return (
        <List.Item
            {...remain}
            className={dataItemStyles.item}
            onClick={() => navigate(`/roles/${role.id}`)}
        >
            <div className={dataItemStyles.itemText}>{role.name}</div>
            <div className={dataItemStyles.iconBox}>
                <AttachIcon
                    show={pathname.endsWith('/attach')}
                    title="Vincular"
                    className={iconStyles.iconSwing}
                    onClick={attachHandler(role)}
                />
                <DetachIcon
                    show={!pathname.endsWith('/attach')}
                    title="Desvincular"
                    className={iconStyles.iconSwing}
                    onClick={detachHandler(role)}
                />
            </div>
        </List.Item>
    );
};
