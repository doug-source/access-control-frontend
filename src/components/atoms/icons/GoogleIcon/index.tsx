import Icon from '@/icons/google-24x24.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

type GoogleIconProps = WithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const GoogleIcon = ({
    show = true,
    title,
    ...remain
}: GoogleIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} />;
};
