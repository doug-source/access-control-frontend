import { useLocalLocation } from '@/shared/hooks/useLocalLocation';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useLocalAttachHandler } from './useLocalAttachHandler';
import { useLocalDetachHandler } from './useLocalDetachHandler';

export const useDeps = () => {
    const { pathname } = useLocalLocation();
    const detachHandler = useLocalDetachHandler();
    const attachHandler = useLocalAttachHandler();
    const navigate = useLocalNavigate();
    return { detachHandler, attachHandler, navigate, pathname };
};
