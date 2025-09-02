import Icon from '@/icons/users-removed-24x24.svg?react';
import type { WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';

type UsersRemovedIconProps = WithShow<ComponentPropsWithRef<'svg'>> & {
    title?: string;
};

export const UsersRemovedIcon = ({
    show = true,
    className,
    title,
    ...remain
}: UsersRemovedIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} className={classNames(className)} />;
};
