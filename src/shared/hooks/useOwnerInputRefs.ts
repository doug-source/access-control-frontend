import { useRef } from 'react';
import { useLocalLocation } from './useLocalLocation';

export const useOwnerInputRefs = () => {
    const { pathname } = useLocalLocation();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const queryOwnerRef = useRef<{ name: string; value: string }>({
        name: 'owner',
        value: pathname.endsWith('/attach') ? 'no' : 'yes',
    });
    return [inputRef, queryOwnerRef] as const;
};
