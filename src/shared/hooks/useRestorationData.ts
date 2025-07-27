import { RestorationDataContext } from '@/shared/contexts/RestorationDataContext';
import { useContext } from 'react';

export const useRestorationData = () => useContext(RestorationDataContext);
