import { useDispatch } from '@/shared/hooks/useDispatch';
import type { PhotoChosenChangeAction } from '@/shared/types/Reducers/UserConfig';
import { type ChangeEvent, useCallback } from 'react';

export const usePhotoHandler = () => {
    const dispatch = useDispatch<PhotoChosenChangeAction>();
    return useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            const $input = evt.target;
            const $file = $input.files?.item(0) ?? null;
            dispatch({
                type: 'photo-chosen-change',
                payload: $file,
            });
        },
        [dispatch]
    );
};
