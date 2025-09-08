import type { ReloadHandle } from '@/shared/types/ReactHandles/ReloadHandle';
import {
    type RefObject,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';

export const useDeps = <T>(
    output: Promise<{ data: T[] }>,
    ref: RefObject<ReloadHandle | null>
) => {
    const [status, setStatus] = useState<{
        wait: boolean;
        result: { data: T[] } | null;
    }>({ wait: true, result: null });
    useImperativeHandle(ref, () => ({
        wait() {
            setStatus({ wait: true, result: null });
        },
    }));
    useEffect(() => {
        output
            .then((result) => setStatus({ wait: false, result }))
            .catch(() => setStatus({ wait: false, result: null }));
    }, [output]);
    return status;
};
