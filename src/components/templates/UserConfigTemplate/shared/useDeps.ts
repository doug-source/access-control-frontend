import { useSignState } from '@/shared/hooks/useSignState';
import { useId } from 'react';

export const useDeps = () => {
    const nameId = useId();
    const phoneId = useId();
    const photo = useSignState().state.user?.photo ?? null;
    return { nameId, phoneId, photo };
};
