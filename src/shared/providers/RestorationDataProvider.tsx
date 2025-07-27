import { RestorationDataContext } from '@/shared/contexts/RestorationDataContext';
import { type RestorationDataProvided } from '@/shared/contexts/types/RestorationDataProvided';
import { type ReactNode, useMemo } from 'react';

interface RestorationDataProviderProps extends RestorationDataProvided {
    children: ReactNode;
}

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
        <RestorationDataContext.Provider value={value}>
            {children}
        </RestorationDataContext.Provider>
    );
};
