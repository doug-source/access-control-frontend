import Icon from '@/icons/detach-24x21.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

type DetachIconProps = WithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const DetachIcon = ({
    show = true,
    className,
    title,
    ...remain
}: DetachIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} className={className} ref={ref} />;
};
