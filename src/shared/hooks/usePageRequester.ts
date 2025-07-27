import { PageRequesterContext } from '@/shared/contexts/PageRequesterContext';
import { useContext } from 'react';

export const usePageRequester = () => {
    const pageRequester = useContext(PageRequesterContext);
    if (pageRequester === null) {
        throw new Error('Invalid PageRequester!');
    }
    return pageRequester;
};
