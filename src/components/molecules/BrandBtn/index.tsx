import { Btn } from '@/components/atoms/Btn';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './BrandBtn.module.scss';

type BrandBtnProps = ComponentPropsWithoutRef<typeof Btn>;

export const BrandBtn = ({
    className,
    type = 'submit',
    children,
    ...remain
}: BrandBtnProps) => (
    <Btn
        {...remain}
        type={type}
        className={classNames(styles.brandBtn, className)}
    >
        {children}
    </Btn>
);
