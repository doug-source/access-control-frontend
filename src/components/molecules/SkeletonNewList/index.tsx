import { List } from '@/components/atoms/List';
import type { ComponentPropsWithRef } from 'react';
import styles from './SkeletonList.module.scss';

type RemainProps = Omit<ComponentPropsWithRef<typeof List.Box>, 'children'>;
interface SkeletonListProps extends RemainProps {
    rows?: number;
}

export const SkeletonList = ({
    className,
    rows = 4,
    ...remain
}: SkeletonListProps) => (
    <List.Box {...remain} className={className}>
        {Array.from({ length: rows }).map((_, i) => (
            <List.Item key={i} className={styles.skeletonList}>
                &nbsp;
            </List.Item>
        ))}
    </List.Box>
);
