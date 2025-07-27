import { useResetPasswordProvided } from './useResetPasswordProvided';
import { useResetPasswordSubmit } from './useResetPasswordSubmit';

export const useDeps = () => {
    useResetPasswordProvided();
    const submitArgs = useResetPasswordSubmit();
    return { ...submitArgs };
};
