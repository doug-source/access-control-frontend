import { List } from '@/components/atoms/List';
import { type WithShow } from '@/shared/types/Utils';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './SkeletonList.module.scss';

type SkeletonListProps = WithShow<
    ComponentPropsWithoutRef<typeof List.Box> & {
        rows?: number;
    },
    true
>;

export const SkeletonList = ({
    show,
    className,
    rows = 4,
    children,
    ...remain
}: SkeletonListProps) => {
    if (!show) {
        return (
            <List.Box {...remain} className={className}>
                {Array.from({ length: rows }).map((_, i) => (
                    <List.Item key={i} className={styles.skeletonList}>
                        &nbsp;
                    </List.Item>
                ))}
            </List.Box>
        );
    }
    return children;
};
