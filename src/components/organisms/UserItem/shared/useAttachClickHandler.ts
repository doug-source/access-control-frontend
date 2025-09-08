import { useState, type MouseEventHandler } from 'react';

export const useAttachClickHandler = () => {
    const [showConfirmSelect, setShowConfirmSelect] = useState(false);
    const onAttachHandler: MouseEventHandler<HTMLButtonElement> = (evt) => {
        evt.stopPropagation();
        setShowConfirmSelect(true);
    };
    return { showConfirmSelect, setShowConfirmSelect, onAttachHandler };
};
