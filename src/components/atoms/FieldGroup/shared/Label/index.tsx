import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './Label.module.scss';

type LabelProps = ComponentPropsWithRef<'label'>;

export const Label = memo(({ children, className, ...remain }: LabelProps) => (
    <label {...remain} className={classNames(styles.fieldLabel, className)}>
        {children}
    </label>
));
