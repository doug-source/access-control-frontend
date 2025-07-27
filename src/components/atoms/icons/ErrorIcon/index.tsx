import Icon from '@/icons/error-24x24.svg?react';
import { type WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import { type ComponentPropsWithoutRef } from 'react';

type ErrorIconProps = WithShow<ComponentPropsWithoutRef<'svg'>> & {
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
