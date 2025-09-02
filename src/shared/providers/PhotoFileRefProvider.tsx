import { PhotoFileRefContext } from '@/shared/contexts/PhotoFileRefContext';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

interface PhotoFileRefProviderProps extends PropsWithChildren {
    photoFileRef: ComponentPropsWithRef<typeof PhotoFileRefContext>['value'];
}

export const PhotoFileRefProvider = ({
    photoFileRef,
    children,
}: PhotoFileRefProviderProps) => (
    <PhotoFileRefContext value={photoFileRef}>{children}</PhotoFileRefContext>
);
