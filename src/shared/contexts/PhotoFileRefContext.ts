import { PhotoFile } from '@/components/molecules/PhotoFile';
import { type ComponentRef, createContext, type RefObject } from 'react';

export const PhotoFileRefContext = createContext<RefObject<ComponentRef<
    typeof PhotoFile
> | null> | null>(null);
