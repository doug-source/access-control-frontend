import { useAuth } from '@/shared/hooks/useAuth';
import { type RefObject, useEffect } from 'react';

export const useUserData = (
    nameRef: RefObject<HTMLInputElement | null>,
    emailRef: RefObject<HTMLInputElement | null>,
    phoneRef: RefObject<HTMLInputElement | null>
) => {
    const user = useAuth()?.user;
    useEffect(() => {
        if (
            !user ||
            nameRef.current === null ||
            emailRef.current === null ||
            phoneRef.current === null
        ) {
            return;
        }
        nameRef.current.value = user.name;
        emailRef.current.value = user.email;
        phoneRef.current.value = user.phone ?? '';
    }, [nameRef, emailRef, phoneRef, user]);
};
