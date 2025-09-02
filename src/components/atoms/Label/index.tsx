import type { WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';

type LabelProps = WithShow<ComponentPropsWithRef<'label'>>;

export const Label = ({ show, children, ...remain }: LabelProps) => (
    <label {...remain} className={classNames(!show && 'screen-reader-only')}>
        {children}
    </label>
);
