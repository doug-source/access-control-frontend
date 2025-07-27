import { type DetachmentDataProvided } from '@/shared/contexts/types/DetachmentDataProvided';
import { ReactNode, useMemo } from 'react';
import { DetachmentDataContext } from '../contexts/DetachmentDataContext';

interface DetachmentDataProviderProps extends DetachmentDataProvided {
    children: ReactNode;
}

export const DetachmentDataProvider = ({
    detachmentConfirm,
    onDetach,
    children,
}: DetachmentDataProviderProps) => {
    const value = useMemo(
        () => ({
            detachmentConfirm,
            onDetach,
        }),
        [detachmentConfirm, onDetach]
    );
    return (
        <DetachmentDataContext.Provider value={value}>
            {children}
        </DetachmentDataContext.Provider>
    );
};
