import { useRegisterRequestProvided } from './useRegisterRequestProvided';
import { useRegisterRequestSubmit } from './useRegisterRequestSubmit';

export const useDeps = () => {
    useRegisterRequestProvided();
    return useRegisterRequestSubmit();
};
