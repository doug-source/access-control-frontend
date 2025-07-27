import { useSingleDataFetch } from '@/shared/hooks/useSingleDataFetch';
import { useParams } from 'react-router';

type Viewers = Parameters<typeof useSingleDataFetch>[0];

export const useDeps = (removed: boolean) => {
    const id = Number(useParams().id);
    const endpoint: Viewers = removed
        ? `/api/users/removed/${id}`
        : `/api/users/${id}`;

    useSingleDataFetch(endpoint);
};
