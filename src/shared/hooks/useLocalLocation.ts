import { type Paths } from '@/shared/types/Urls/Paths';
import { type Location, useLocation } from 'react-router';

interface LocalLocation<T extends string> extends Location {
    pathname: T;
}

type Navigations = Paths['navigation']['concrete'];

export const useLocalLocation = <
    T extends Navigations = Navigations
>(): LocalLocation<T> => {
    return useLocation() as LocalLocation<T>;
};
