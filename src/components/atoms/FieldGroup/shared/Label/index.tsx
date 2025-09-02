import classNames from 'classnames';
import { memo, type ComponentPropsWithoutRef } from 'react';
import styles from './Label.module.scss';

type LabelProps = ComponentPropsWithoutRef<'label'>;

export const Label = memo(({ children, className, ...remain }: LabelProps) => (
    <label {...remain} className={classNames(styles.fieldLabel, className)}>
        {children}
    </label>
));
