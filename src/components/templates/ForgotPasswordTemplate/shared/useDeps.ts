import { useId } from 'react';

export const useDeps = () => {
    const emailId = useId();
    return [emailId] as const;
};
