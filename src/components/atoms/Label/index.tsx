import type { PropsWithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';

type LabelProps = PropsWithShow<ComponentPropsWithRef<'label'>>;

export const Label = ({ show, children, ...remain }: LabelProps) => (
    <label {...remain} className={classNames(!show && 'screen-reader-only')}>
        {children}
    </label>
);
