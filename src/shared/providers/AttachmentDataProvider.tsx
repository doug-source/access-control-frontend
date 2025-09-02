import { AttachmentDataContext } from '@/shared/contexts/AttachmentDataContext';
import type { AttachmentDataProvided } from '@/shared/contexts/types/AttachmentDataProvided';
import { type PropsWithChildren, useMemo } from 'react';

type AttachmentDataProviderProps = AttachmentDataProvided & PropsWithChildren;

export const AttachmentDataProvider = ({
    children,
    attachmentConfirm,
    onAttach,
}: AttachmentDataProviderProps) => {
    const data = useMemo<AttachmentDataProvided>(
        () => ({
            attachmentConfirm,
            onAttach,
        }),
        [attachmentConfirm, onAttach]
    );
    return (
        <AttachmentDataContext value={data}>{children}</AttachmentDataContext>
    );
};
