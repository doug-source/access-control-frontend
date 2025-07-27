import { Btn } from '@/components/atoms/Btn';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './PrimaryBtn.module.scss';

type PrimaryBtnProps = ComponentPropsWithoutRef<typeof Btn>;

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
