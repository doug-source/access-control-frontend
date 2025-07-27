import Icon from '@/icons/attach-24x12.svg?react';
import { type WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import { type ComponentPropsWithoutRef } from 'react';

type AttachIconProps = WithShow<ComponentPropsWithoutRef<'svg'>> & {
    title?: string;
};

export const AttachIcon = ({
    show = true,
    className,
    title,
    ...remain
}: AttachIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} className={className} ref={ref} />;
};
