import { Btn } from '@/components/atoms/Btn';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './PrimaryBtn.module.scss';

type PrimaryBtnProps = ComponentPropsWithRef<typeof Btn>;

export const PrimaryBtn = ({
    className,
    type = 'submit',
    children,
    ...remain
}: PrimaryBtnProps) => (
    <Btn
        {...remain}
        type={type}
        className={classNames(styles.primaryBtn, className)}
    >
        {children}
    </Btn>
);
