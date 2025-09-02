import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './FormLayout.module.scss';

type FormLayoutProps = ComponentPropsWithRef<'div'>;

export const FormLayout = memo(
    ({ className, children, ...remain }: FormLayoutProps) => (
        <div {...remain} className={classNames(className, styles.formLayout)}>
            {children}
        </div>
    )
);
