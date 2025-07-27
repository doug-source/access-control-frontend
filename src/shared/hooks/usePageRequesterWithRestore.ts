import { PageRequesterWithRestoreContext } from '@/shared/contexts/PageRequesterWithRestoreContext';
import { useContext } from 'react';

export const usePageRequesterWithRestore = () => {
    return useContext(PageRequesterWithRestoreContext);
};
