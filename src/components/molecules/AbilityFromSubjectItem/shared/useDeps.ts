import { useLocalLocation } from '@/shared/hooks/useLocalLocation';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { type Paths } from '@/shared/types/Urls/Paths';
import { useLocalHandler } from './useLocalHandler';

type AbilityNavigations = Exclude<
    Paths['navigation']['ability'],
    Paths['navigation']['abstract']
>;

export const useDeps = () => {
    const { pathname } = useLocalLocation<AbilityNavigations>();
    const localHandler = useLocalHandler(pathname);
    const navigate = useLocalNavigate();
    return { localHandler, navigate, pathname };
};
