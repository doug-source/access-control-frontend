import Icon from '@/icons/user-24x24.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

interface UserIconProps extends WithShow<ComponentPropsWithRef<'svg'>> {
    title?: string;
}

export const UserIcon = ({
    show = true,
    className,
    title,
    ...remain
}: UserIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} className={className} ref={ref} />;
};
