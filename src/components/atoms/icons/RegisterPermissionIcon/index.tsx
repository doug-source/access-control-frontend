import Icon from '@/icons/reg-permission-24x24.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

type RegisterPermissionIconProps = WithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const RegisterPermissionIcon = ({
    show = true,
    className,
    title,
    ...remain
}: RegisterPermissionIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} className={className} ref={ref} />;
};
