import Icon from '@/icons/roles-18x24.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

type RolesIconProps = WithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const RolesIcon = ({
    show = true,
    className,
    title,
    ...remain
}: RolesIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} className={className} />;
};
