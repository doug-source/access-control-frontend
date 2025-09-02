import { RemotionDataContext } from '@/shared/contexts/RemotionDataContext';
import type { RemotionDataProvided } from '@/shared/contexts/types/RemotionDataProvided';
import { type PropsWithChildren, useMemo } from 'react';

type RemotionDataProviderProps = RemotionDataProvided & PropsWithChildren;

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
    return <RemotionDataContext value={value}>{children}</RemotionDataContext>;
};
