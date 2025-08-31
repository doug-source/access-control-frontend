import { useSignState } from '@/shared/hooks/useSignState';
import type { UserIndex } from '@/shared/types/Models/User';
import { useCallback } from 'react';

export const useMakeUserChecking = () => {
    const id = Number(useSignState().user?.id);
    return useCallback((user: UserIndex) => user.id === id, [id]);
};
