import Icon from '@/icons/logout-30x24.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

type LogoutIconProps = WithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const LogoutIcon = ({
    show = true,
    className,
    title,
    ...remain
}: LogoutIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} className={className} />;
};
