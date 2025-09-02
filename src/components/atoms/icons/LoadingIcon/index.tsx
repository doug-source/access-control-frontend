import Icon from '@/icons/loading-light-24x24.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';
import styles from './LoadingIcon.module.scss';

type LoadingIconProps = WithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const LoadingIcon = ({
    show = true,
    title,
    ...remain
}: LoadingIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} className={styles.rotating} />;
};
