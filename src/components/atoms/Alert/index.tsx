import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './Alert.module.scss';

type AlertProps = ComponentPropsWithRef<'div'>;

export const Alert = memo(({ className, children, ...remain }: AlertProps) => (
    <div
        {...remain}
        role="alert"
        className={classNames(className, styles.alert)}
    >
        {children}
    </div>
));
