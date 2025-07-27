import { type Paths } from '@/shared/types/Urls/Paths';
import {
    useNavigate,
    type NavigateFunction,
    type NavigateOptions,
    type Path,
} from 'react-router';

interface LocalPath extends Path {
    pathname: Paths['navigation']['concrete'];
}

interface LocalNavigateFunction extends NavigateFunction {
    (
        to: Paths['navigation']['concrete'] | LocalPath,
        options?: NavigateOptions
    ): void | Promise<void>;
}

export const useLocalNavigate = (): LocalNavigateFunction => {
    return useNavigate();
};
