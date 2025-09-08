import Icon from '@/icons/upload-file-24x24.svg?react';
import type { PropsWithShow } from '@/shared/types/Utils';
import { svgAppendTitle } from '@/shared/utils/svgAppendTitle';
import type { ComponentPropsWithRef } from 'react';

interface UploadIconProps extends PropsWithShow<ComponentPropsWithRef<'svg'>> {
    title?: string;
}

export const UploadIcon = ({
    show = true,
    className,
    title,
    ...remain
}: UploadIconProps) => {
    if (!show) {
        return null;
    }
    const ref = svgAppendTitle(title);
    return <Icon {...remain} className={className} ref={ref} />;
};
