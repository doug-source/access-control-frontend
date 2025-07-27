import { useSingleDataFetch } from '@/shared/hooks/useSingleDataFetch';
import { useParams } from 'react-router';

export const useDeps = () => {
    const id = Number(useParams().id ?? 0);
    useSingleDataFetch(`/api/abilities/${id}`);
};
