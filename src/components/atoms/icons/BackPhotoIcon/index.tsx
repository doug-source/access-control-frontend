import Icon from '@/icons/backPhoto-24x18.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithoutRef } from 'react';

interface BackPhotoIconProps extends WithShow<ComponentPropsWithoutRef<'svg'>> {
    title?: string;
}

export const BackPhotoIcon = ({
    show = true,
    className,
    title,
    ...remain
}: BackPhotoIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} className={className} ref={ref} />;
};
