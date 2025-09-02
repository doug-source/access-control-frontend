import { ApprovementDataContext } from '@/shared/contexts/ApprovementDataContext';
import { useContext } from 'react';

export const useApprovementData = () => {
    const approvementData = useContext(ApprovementDataContext);
    if (approvementData === null) {
        throw new Error('Invalid ApprovementData!');
    }
    return approvementData;
};
