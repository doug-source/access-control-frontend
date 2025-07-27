import { SuperAdminCreatorContext } from '@/shared/contexts/SuperAdminCreatorContext';
import { useContext } from 'react';

export const useCreator = () => {
    const creator = useContext(SuperAdminCreatorContext);
    if (creator === null) {
        throw new Error('Invalid Creator!');
    }
    return creator;
};
