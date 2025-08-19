import { type ChangeEvent, RefObject, useCallback, useState } from 'react';

export const usePhotoHandler = (
    setFile: (val: File | null) => void,
    inputRef?: RefObject<HTMLInputElement | null>
) => {
    const [inputKey, setInputKey] = useState(Date.now());
    const changeHandler = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            setFile(evt.target.files?.item(0) ?? null);
        },
        [setFile]
    );
    const clearFile = useCallback(() => {
        const $input = inputRef?.current;
        if (!$input) {
            return;
        }
        setFile(null);
        $input.value = '';
        // $input.form?.reset();
        setInputKey(Date.now());
    }, [inputRef, setFile]);

    return { inputKey, clearFile, changeHandler };
};
