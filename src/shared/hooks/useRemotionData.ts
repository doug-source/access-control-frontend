import { RemotionDataContext } from '@/shared/contexts/RemotionDataContext';
import { useContext } from 'react';

export const useRemotionData = () => {
    const remotionData = useContext(RemotionDataContext);
    if (remotionData === null) {
        throw new Error('Invalid RemotionData!');
    }
    return remotionData;
};
