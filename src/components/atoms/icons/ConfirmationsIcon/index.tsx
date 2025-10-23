import Icon from '@/icons/confirmations-24x24.svg?react';
import type { PropsWithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

interface ConfirmationsIconProps
    extends PropsWithShow<ComponentPropsWithRef<'svg'>> {
    title?: string;
}

export const ConfirmationsIcon = ({
    show = true,
    className,
    title,
    ...remain
}: ConfirmationsIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} className={className} ref={ref} />;
};
