import { useContext } from 'react';
import { RemotionDataContext } from '../contexts/RemotionDataContext';

export const useRemotionData = () => {
    const remotionData = useContext(RemotionDataContext);
    if (remotionData === null) {
        throw new Error('Invalid RemotionData!');
    }
    return remotionData;
};
