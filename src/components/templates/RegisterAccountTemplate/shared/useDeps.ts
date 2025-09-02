import { useId } from 'react';

export const useDeps = (token: string | null) => {
    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();
    const passConfirm = useId();

    const host = import.meta.env.VITE_HOST as string;
    return {
        providerLink: `${host}/auth/google/redirect/register/${token ?? ''}`,
        nameId,
        emailId,
        passwordId,
        passConfirm,
    };
};
