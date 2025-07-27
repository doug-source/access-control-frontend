import { PageRequesterWithApproveContext } from '@/shared/contexts/PageRequesterWithApproveContext';
import { useContext } from 'react';

export const usePageRequesterWithApprove = () => {
    return useContext(PageRequesterWithApproveContext);
};
