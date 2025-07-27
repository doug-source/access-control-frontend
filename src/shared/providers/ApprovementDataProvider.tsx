import { ApprovementDataContext } from '@/shared/contexts/ApprovementDataContext';
import { type ApprovementDataProvided } from '@/shared/contexts/types/ApprovementDataProvided';
import { useMemo, type ReactNode } from 'react';

interface ApprovementDataProviderProps extends ApprovementDataProvided {
    children: ReactNode;
}

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
        <ApprovementDataContext.Provider value={value}>
            {children}
        </ApprovementDataContext.Provider>
    );
};
