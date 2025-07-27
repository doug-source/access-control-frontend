import Icon from '@/icons/undo-24x24.svg?react';
import { type WithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import { type ComponentPropsWithoutRef } from 'react';

type UndoIconProps = WithShow<ComponentPropsWithoutRef<'svg'>> & {
    title?: string;
};

export const UndoIcon = ({
    show = true,
    className,
    title,
    ...remain
}: UndoIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} ref={ref} className={className} />;
};
