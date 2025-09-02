import type { ComponentPropsWithRef } from 'react';
import { Item } from '../Item';
import styles from './Empty.module.scss';

type EmptyProps = ComponentPropsWithRef<typeof Item>;

export const Empty = (props: EmptyProps) => (
    <Item {...props} className={styles.empty}>
        Lista vazia
    </Item>
);
