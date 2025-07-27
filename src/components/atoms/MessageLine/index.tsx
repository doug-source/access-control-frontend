import { type ComponentPropsWithoutRef } from 'react';
import styles from './MessageLine.module.scss';

type MessageLineProps = ComponentPropsWithoutRef<'div'>;

export const MessageLine = ({ children, ...remain }: MessageLineProps) => (
    <div {...remain} className={styles.msgLine}>
        {children}
    </div>
);
