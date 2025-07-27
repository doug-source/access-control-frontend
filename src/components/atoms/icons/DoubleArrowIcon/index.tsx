import Icon from '@/icons/double-arrow-24x24.svg?react';
import { type WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import { type ComponentPropsWithoutRef } from 'react';

type DoubleArrowIconProps = WithShow<ComponentPropsWithoutRef<'svg'>> & {
    title?: string;
};

export const DoubleArrowIcon = ({
    show = true,
    className,
    title,
    ...remain
}: DoubleArrowIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} className={className} />;
};
