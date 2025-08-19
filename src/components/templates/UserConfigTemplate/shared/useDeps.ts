import { useId } from 'react';

export const useDeps = () => {
    const nameId = useId();
    const phoneId = useId();
    return [nameId, phoneId] as const;
};
