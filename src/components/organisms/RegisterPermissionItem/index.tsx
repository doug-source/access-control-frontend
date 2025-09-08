import { List } from '@/components/atoms/List';
import dataItemStyles from '@/shared/stylessheets/dataItem.module.scss';
import type { RegisterPermissionIndex } from '@/shared/types/Models/RegisterPermission';
import { useNavigate } from 'react-router';

interface RegisterPermissionItemProps {
    data: RegisterPermissionIndex;
}

export const RegisterPermissionItem = ({
    data,
}: RegisterPermissionItemProps) => {
    const navigate = useNavigate();
    return (
        <List.Item
            className={dataItemStyles.item}
            onClick={() => navigate(`/register-permissions/${data.id}`)}
        >
            <div className={dataItemStyles.itemText}>{data.email}</div>
        </List.Item>
    );
};
