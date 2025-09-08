import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import { Base } from '../Base';
import styles from './SecondaryBtn.module.scss';

export const SecondaryBtn = ({
    className,
    type = 'submit',
    children,
    ...remain
}: ComponentPropsWithRef<typeof Base>) => (
    <Base
        {...remain}
        type={type}
        className={classNames(styles.secondaryBtn, className)}
    >
        {children}
    </Base>
);
