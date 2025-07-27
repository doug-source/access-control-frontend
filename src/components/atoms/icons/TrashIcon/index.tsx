import Icon from '@/icons/trash-24x24.svg?react';
import { type WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './TrashIcon.module.scss';

type TrashIconProps = WithShow<ComponentPropsWithoutRef<'svg'>> & {
    title?: string;
};

export const TrashIcon = ({
    show = true,
    className,
    title,
    ...remain
}: TrashIconProps) => {
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
