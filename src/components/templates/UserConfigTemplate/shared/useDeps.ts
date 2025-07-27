import { useId } from 'react';
import { useSubmitHandle } from './useSubmitHandle';
import { useUserData } from './useUserData';

export const useDeps = () => {
    const argsSubmit = useSubmitHandle();
    useUserData(argsSubmit.nameRef, argsSubmit.emailRef, argsSubmit.phoneRef);

    const ids = {
        name: useId(),
        phone: useId(),
    };

    return { ...argsSubmit, ids };
};
