import Icon from '@/icons/success-24x24.svg?react';
import type { PropsWithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

type SuccessIconProps = PropsWithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const SuccessIcon = ({
    show = true,
    title,
    ...remain
}: SuccessIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} />;
};
