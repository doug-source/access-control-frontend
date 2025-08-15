import { useRegisterRequestProvided } from './useRegisterRequestProvided';
import { useRegisterRequestSubmit } from './useRegisterRequestSubmit';

export const useDeps = () => {
    useRegisterRequestProvided();
    const host = import.meta.env.VITE_HOST as string;
    const registerRequestArgs = useRegisterRequestSubmit();
    return {
        ...registerRequestArgs,
        providerLink: `${host}/auth/google/redirect/request`,
    };
};
