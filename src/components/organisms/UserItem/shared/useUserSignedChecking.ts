import { useSignState } from '@/shared/hooks/useSignState';
import type { UserIndex } from '@/shared/types/Models/User';

export const useUserSignedChecking = () => {
    const id = Number(useSignState().state.user?.id);
    return (user: UserIndex) => user.id === id;
};
