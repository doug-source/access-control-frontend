import { useRegisterAccountProvided } from './useRegisterAccountProvided';
import { useRegisterAccountSubmit } from './useRegisterAccountSubmit';

export const useDeps = (token: string | null) => {
    useRegisterAccountProvided();
    const registerAccountArgs = useRegisterAccountSubmit(token);
    const host = import.meta.env.VITE_HOST as string;
    return {
        ...registerAccountArgs,
        providerLink: `${host}/auth/google/redirect/register/${token ?? ''}`,
    };
};
