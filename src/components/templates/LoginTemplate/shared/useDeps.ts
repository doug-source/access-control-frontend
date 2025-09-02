import { useId } from 'react';

export const useDeps = () => {
    const emailId = useId();
    const passwordId = useId();

    const host = import.meta.env.VITE_HOST as string;
    return {
        providerLink: `${host}/auth/google/redirect/login`,
        emailId,
        passwordId,
    };
};
