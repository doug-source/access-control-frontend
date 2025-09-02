import Icon from '@/icons/approve-24x23.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

type ApproveIconProps = WithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const ApproveIcon = ({
    show = true,
    className,
    title,
    ...remain
}: ApproveIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} className={className} ref={ref} />;
};
