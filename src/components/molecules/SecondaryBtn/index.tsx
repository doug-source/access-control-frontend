import { Btn } from '@/components/atoms/Btn';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './SecondaryBtn.module.scss';

type SecondaryBtnProps = ComponentPropsWithRef<typeof Btn>;

export const SecondaryBtn = ({
    className,
    type = 'submit',
    children,
    ...remain
}: SecondaryBtnProps) => (
    <Btn
        {...remain}
        type={type}
        className={classNames(styles.secondaryBtn, className)}
    >
        {children}
    </Btn>
);
