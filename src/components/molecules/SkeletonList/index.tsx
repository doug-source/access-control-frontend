import { List } from '@/components/atoms/List';
import type { PropsWithShow } from '@/shared/types/Utils';
import type { ComponentPropsWithRef } from 'react';
import styles from './SkeletonList.module.scss';

type RemainProps = ComponentPropsWithRef<typeof List.Box>;
interface SkeletonListProps extends RemainProps {
    rows?: number;
}

export const SkeletonList = ({
    show,
    className,
    rows = 4,
    children,
    ...remain
}: PropsWithShow<SkeletonListProps, true>) => {
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
