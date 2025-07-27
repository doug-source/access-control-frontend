import Icon from '@/icons/reg-request-24x25.svg?react';
import { type WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import { type ComponentPropsWithoutRef } from 'react';

type RegisterRequestIconProps = WithShow<ComponentPropsWithoutRef<'svg'>> & {
    title?: string;
};

export const RegisterRequestIcon = ({
    show = true,
    className,
    title,
    ...remain
}: RegisterRequestIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} className={className} />;
};
