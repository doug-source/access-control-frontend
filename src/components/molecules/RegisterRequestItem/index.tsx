import { ApproveIcon } from '@/components/atoms/icons/ApproveIcon';
import { TrashIcon } from '@/components/atoms/icons/TrashIcon';
import { List } from '@/components/atoms/List';
import dataItemStyles from '@/shared/stylessheets/dataItem.module.scss';
import iconStyles from '@/shared/stylessheets/icons.module.scss';
import { type RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { ComponentPropsWithoutRef } from 'react';
import { useDeps } from './shared/useDeps';

interface RegisterRequestItemProps
    extends ComponentPropsWithoutRef<typeof List.Item> {
    registerRequest: RegisterRequestIndex;
}

export const RegisterRequestItem = ({
    registerRequest,
    ...remain
}: RegisterRequestItemProps) => {
    const { remotionHandler, approvementHandler, navigate } =
        useDeps(registerRequest);
    return (
        <List.Item
            {...remain}
            className={dataItemStyles.item}
            onClick={() => navigate(`/register-requests/${registerRequest.id}`)}
        >
            <div className={dataItemStyles.itemText}>
                {registerRequest.email}
            </div>
            <div className={dataItemStyles.iconBox}>
                <ApproveIcon
                    className={iconStyles.iconSwing}
                    onClick={approvementHandler(registerRequest)}
                />
                <TrashIcon
                    title="Remover"
                    className={iconStyles.iconSwing}
                    onClick={remotionHandler}
                />
            </div>
        </List.Item>
    );
};
