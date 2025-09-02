import { ApprovementDataContext } from '@/shared/contexts/ApprovementDataContext';
import type { ApprovementDataProvided } from '@/shared/contexts/types/ApprovementDataProvided';
import { type PropsWithChildren, useMemo } from 'react';

type ApprovementDataProviderProps = ApprovementDataProvided & PropsWithChildren;

export const ApprovementDataProvider = ({
    children,
    approvementConfirm,
    onApprove,
}: ApprovementDataProviderProps) => {
    const value = useMemo(
        () => ({
            approvementConfirm,
            onApprove,
        }),
        [approvementConfirm, onApprove]
    );
    return (
        <ApprovementDataContext value={value}>
            {children}
        </ApprovementDataContext>
    );
};
