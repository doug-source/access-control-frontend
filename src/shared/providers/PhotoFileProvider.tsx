import { PhotoFileContext } from '@/shared/contexts/PhotoFileContext';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

interface PhotoProviderProps extends PropsWithChildren {
    file: ComponentPropsWithoutRef<typeof PhotoFileContext.Provider>['value'];
}

export const PhotoFileProvider = ({ file, children }: PhotoProviderProps) => (
    <PhotoFileContext.Provider value={file}>
        {children}
    </PhotoFileContext.Provider>
);
