import { useSignState } from '@/shared/hooks/useSignState';
import type { SignState } from '@/shared/types/Reducers/Sign';
import type { NavigationActions } from '@/shared/types/Urls/shared/Navigations';
import { useState, type MouseEventHandler } from 'react';
import { useSubmit } from 'react-router';

type Storage = keyof SignState['confirmations'];

const useActionClickHandler = <S extends Storage>(
    handler: () => void,
    storage: S,
    key: keyof SignState['confirmations'][typeof storage]
) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const {
        state: { confirmations },
    } = useSignState();

    const clickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        const {
            [storage]: { [key]: ask },
        } = confirmations;
        if (ask) {
            setShowConfirm(true);
        } else {
            handler();
        }
    };
    return {
        clickHandler,
        showConfirm,
        setShowConfirm,
    };
};

const useActionSubmitHandler = (
    actionUrl: NavigationActions[keyof NavigationActions]
) => {
    const submit = useSubmit();
    const [pending, setPending] = useState(false);
    const handler = () => {
        submit(null, {
            method: 'post',
            action: actionUrl,
        });
    };
    return {
        handler,
        pending,
        setPending,
    };
};

export const useActionHandlers = <S extends Storage>(
    actionUrl: NavigationActions[keyof NavigationActions],
    storage: S,
    key: keyof SignState['confirmations'][typeof storage]
) => {
    const outputPos = useActionSubmitHandler(actionUrl);
    const outputPre = useActionClickHandler(outputPos.handler, storage, key);
    return { ...outputPos, ...outputPre };
};
