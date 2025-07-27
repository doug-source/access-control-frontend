import Icon from '@/icons/close-24x24.svg?react';
import { type WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './CloseIcon.module.scss';

type CloseIconProps = WithShow<ComponentPropsWithoutRef<'svg'>> & {
    title?: string;
};

export const CloseIcon = ({
    show = true,
    className,
    title,
    ...remain
}: CloseIconProps) => {
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
