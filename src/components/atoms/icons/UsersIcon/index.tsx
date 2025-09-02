import Icon from '@/icons/users-24x24.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';

type UsersIconProps = WithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const UsersIcon = ({
    show = true,
    className,
    title,
    ...remain
}: UsersIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} className={classNames(className)} />;
};
