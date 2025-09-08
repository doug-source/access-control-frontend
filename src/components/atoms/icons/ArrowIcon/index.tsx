import Icon from '@/icons/arrow-12x24.svg?react';
import type { PropsWithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

interface ArrowIconProps extends PropsWithShow<ComponentPropsWithRef<'svg'>> {
    title?: string;
}

export const ArrowIcon = ({
    show = true,
    className,
    title,
    ...remain
}: ArrowIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} className={className} ref={ref} />;
};
