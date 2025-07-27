import { useRegisterAccountProvided } from './useRegisterAccountProvided';
import { useRegisterAccountSubmit } from './useRegisterAccountSubmit';

export const useDeps = (token: string | null) => {
    useRegisterAccountProvided();
    return useRegisterAccountSubmit(token);
};
