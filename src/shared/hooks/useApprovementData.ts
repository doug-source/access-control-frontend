import { useContext } from 'react';
import { ApprovementDataContext } from '../contexts/ApprovementDataContext';

export const useApprovementData = () => {
    const approvementData = useContext(ApprovementDataContext);
    if (approvementData === null) {
        throw new Error('Invalid ApprovementData!');
    }
    return approvementData;
};
