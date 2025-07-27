import { type RemotionDataProvided } from '@/shared/contexts/types/RemotionDataProvided';
import { ReactNode, useMemo } from 'react';
import { RemotionDataContext } from '../contexts/RemotionDataContext';

interface RemotionDataProviderProps extends RemotionDataProvided {
    children: ReactNode;
}

export const RemotionDataProvider = ({
    children,
    remotionConfirm,
    onRemove,
}: RemotionDataProviderProps) => {
    const value = useMemo(
        () => ({
            remotionConfirm,
            onRemove,
        }),
        [remotionConfirm, onRemove]
    );
    return (
        <RemotionDataContext.Provider value={value}>
            {children}
        </RemotionDataContext.Provider>
    );
};
