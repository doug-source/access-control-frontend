import { useDispatch } from '@/shared/hooks/useDispatch';
import type { PhotoChosenChangeAction } from '@/shared/types/Reducers/UserConfig';
import { type RefObject, useCallback } from 'react';

export const useClickHandler = (
    photoInputRef: RefObject<HTMLInputElement | null>
) => {
    const dispatch = useDispatch<PhotoChosenChangeAction>();
    return useCallback(() => {
        dispatch({
            type: 'photo-chosen-change',
            payload: null,
        });
        const { current: photoInput } = photoInputRef;
        if (photoInput !== null) {
            photoInput.value = '';
        }
    }, [dispatch, photoInputRef]);
};
