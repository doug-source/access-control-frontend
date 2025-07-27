import { AttachmentDataContext } from '@/shared/contexts/AttachmentDataContext';
import { type AttachmentDataProvided } from '@/shared/contexts/types/AttachmentDataProvided';
import { useMemo, type ReactNode } from 'react';

interface AttachmentDataProviderProps extends AttachmentDataProvided {
    children: ReactNode;
}

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
        <AttachmentDataContext.Provider value={data}>
            {children}
        </AttachmentDataContext.Provider>
    );
};
