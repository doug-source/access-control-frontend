import { SelfUpdateContext } from '@/shared/contexts/SelfUpdateContext';
import { useContext } from 'react';

export const useSelfUpdate = () => {
    return useContext(SelfUpdateContext);
};
