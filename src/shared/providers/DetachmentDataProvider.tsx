import { DetachmentDataContext } from '@/shared/contexts/DetachmentDataContext';
import type { DetachmentDataProvided } from '@/shared/contexts/types/DetachmentDataProvided';
import { type PropsWithChildren, useMemo } from 'react';

type DetachmentDataProviderProps = DetachmentDataProvided & PropsWithChildren;

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
        <DetachmentDataContext value={value}>{children}</DetachmentDataContext>
    );
};
