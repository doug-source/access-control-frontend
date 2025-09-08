import Icon from '@/icons/brand-24x24.svg?react';
import type { PropsWithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './BrandIcon.module.scss';

type BrandIconProps = PropsWithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const BrandIcon = ({
    show = true,
    className,
    title,
    ...remain
}: BrandIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return (
        <Icon
            {...remain}
            ref={ref}
            className={classNames(styles.icon, className)}
        />
    );
};
