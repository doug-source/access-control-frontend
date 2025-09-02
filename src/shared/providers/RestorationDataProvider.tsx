import { RestorationDataContext } from '@/shared/contexts/RestorationDataContext';
import type { RestorationDataProvided } from '@/shared/contexts/types/RestorationDataProvided';
import { type PropsWithChildren, useMemo } from 'react';

type RestorationDataProviderProps = RestorationDataProvided & PropsWithChildren;

export const RestorationDataProvider = ({
    children,
    restorationConfirm,
    onRestore,
}: RestorationDataProviderProps) => {
    const value = useMemo(
        () => ({
            restorationConfirm,
            onRestore,
        }),
        [restorationConfirm, onRestore]
    );
    return (
        <RestorationDataContext value={value}>
            {children}
        </RestorationDataContext>
    );
};
