import Icon from '@/icons/error-24x24.svg?react';
import type { PropsWithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

type ErrorIconProps = PropsWithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const ErrorIcon = ({
    show = true,
    title,
    ...remain
}: ErrorIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} />;
};
