import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useRemotionHandler } from './useRemotionHandler';
import { useRestorationHandler } from './useRestorationHandler';

export const useDeps = () => {
    const remotionHandler = useRemotionHandler();
    const restorationHandler = useRestorationHandler();
    const navigate = useLocalNavigate();
    return { remotionHandler, restorationHandler, navigate };
};
