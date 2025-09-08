import { List } from '@/components/atoms/List';
import dataItemStyles from '@/shared/stylessheets/dataItem.module.scss';
import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';

interface BoxListItemProps<T, K> {
    data: T;
    keyDesk: K;
    makeNavigation: (id: number) => string;
}

export const BoxListItem = <T extends { id: number }, K extends keyof T>({
    children,
    data,
    keyDesk,
    makeNavigation,
}: PropsWithChildren<BoxListItemProps<T, K>>) => {
    const navigate = useNavigate();
    return (
        <List.Item
            className={dataItemStyles.item}
            onClick={() => navigate(makeNavigation(data.id))}
        >
            <div className={dataItemStyles.itemText}>
                {String(data[keyDesk])}
            </div>
            <div className={dataItemStyles.iconBox}>{children}</div>
        </List.Item>
    );
};
