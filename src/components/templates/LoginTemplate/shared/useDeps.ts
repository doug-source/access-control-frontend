import { useAuthSubmit } from './useAuthSubmit';
import { useLoginProvided } from './useLoginProvided';

export const useDeps = () => {
    const [provided] = useLoginProvided();
    const submitArgs = useAuthSubmit();
    return { provided, ...submitArgs };
};
