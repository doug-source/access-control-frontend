import type { ComponentPropsWithRef } from 'react';
import styles from './MessageLine.module.scss';

type MessageLineProps = ComponentPropsWithRef<'div'>;

export const MessageLine = ({ children, ...remain }: MessageLineProps) => (
    <div {...remain} className={styles.msgLine}>
        {children}
    </div>
);
