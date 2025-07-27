import Icon from '@/icons/plus-24x24.svg?react';
import { type WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import { type ComponentPropsWithoutRef } from 'react';

type PlusIconProps = WithShow<ComponentPropsWithoutRef<'svg'>> & {
    title?: string;
};

export const PlusIcon = ({
    show = true,
    className,
    title,
    ...remain
}: PlusIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} className={className} ref={ref} />;
};
