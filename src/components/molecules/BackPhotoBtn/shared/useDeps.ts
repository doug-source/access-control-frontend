import { RefObject, useId } from 'react';
import { useClickHandler } from './useClickHandler';

export const useDeps = (photoInputRef: RefObject<HTMLInputElement | null>) => {
    const backBtnId = useId();
    const clickHandler = useClickHandler(photoInputRef);
    return [backBtnId, clickHandler] as const;
};
