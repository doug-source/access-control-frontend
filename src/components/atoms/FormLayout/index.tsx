import classNames from 'classnames';
import { memo, type ComponentPropsWithoutRef } from 'react';
import styles from './FormLayout.module.scss';

type FormLayoutProps = ComponentPropsWithoutRef<'div'>;

export const FormLayout = memo(
    ({ className, children, ...remain }: FormLayoutProps) => (
        <div {...remain} className={classNames(className, styles.formLayout)}>
            {children}
        </div>
    )
);
