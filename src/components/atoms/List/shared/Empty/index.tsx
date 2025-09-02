import type { ComponentPropsWithoutRef } from 'react';
import { Item } from '../Item';
import styles from './Empty.module.scss';

type EmptyProps = ComponentPropsWithoutRef<typeof Item>;

export const Empty = (props: EmptyProps) => (
    <Item {...props} className={styles.empty}>
        Lista vazia
    </Item>
);
