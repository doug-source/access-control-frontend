import { List } from '@/components/atoms/List';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import dataItemStyles from '@/shared/stylessheets/dataItem.module.scss';
import type { RegisterPermissionIndex } from '@/shared/types/Models/RegisterPermission';
import type { ComponentPropsWithRef } from 'react';

type RemainProps = ComponentPropsWithRef<typeof List.Item>;
interface RegisterPermissionItemProps extends RemainProps {
    registerPermission: RegisterPermissionIndex;
}

export const RegisterPermissionItem = ({
    registerPermission,
    ...remain
}: RegisterPermissionItemProps) => {
    const navigate = useLocalNavigate();
    return (
        <List.Item
            {...remain}
            className={dataItemStyles.item}
            onClick={() =>
                navigate(`/register-permissions/${registerPermission.id}`)
            }
        >
            <div className={dataItemStyles.itemText}>
                {registerPermission.email}
            </div>
        </List.Item>
    );
};
