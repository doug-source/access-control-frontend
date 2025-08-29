import type { RequestAborter } from '@/shared/types/Contracts/RequestAborter';
import { useEffect } from 'react';

export const useUnmountAbortRequest = (subject: RequestAborter) => {
    useEffect(() => {
        return () => {
            subject.abortRequest();
        };
    }, [subject]);
};
