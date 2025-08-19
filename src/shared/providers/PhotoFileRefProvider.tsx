import { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { PhotoFileRefContext } from '../contexts/PhotoFileRefContext';

interface PhotoFileRefProviderProps extends PropsWithChildren {
    photoFileRef: ComponentPropsWithRef<
        typeof PhotoFileRefContext.Provider
    >['value'];
}

export const PhotoFileRefProvider = ({
    photoFileRef,
    children,
}: PhotoFileRefProviderProps) => (
    <PhotoFileRefContext.Provider value={photoFileRef}>
        {children}
    </PhotoFileRefContext.Provider>
);
