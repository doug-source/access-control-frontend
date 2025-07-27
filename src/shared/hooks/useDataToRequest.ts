import { useParams } from 'react-router';
import { type LocationStateBetweenScreen } from '../types/LocationStateBetweenScreen';
import { useLocalLocation } from './useLocalLocation';

export const useDataToRequest = <T, W extends string>(
    makeEndpoint: (id: number) => W
): [W, LocationStateBetweenScreen<T>] => {
    const params = useParams();
    const { state } = useLocalLocation();
    const info = state as LocationStateBetweenScreen<T>;

    return [makeEndpoint(Number(params.id ?? 0)), info] as const;
};
