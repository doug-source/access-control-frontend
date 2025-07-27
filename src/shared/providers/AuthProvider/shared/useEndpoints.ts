import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import type { Paths } from '@/shared/types/Urls/Paths';
import { useEffect, useState } from 'react';

export const useEndpoints = () => {
    const navigate = useLocalNavigate();
    const [endpoint, setEndpoint] = useState<
        Paths['navigation']['concrete'] | null
    >(null);
    useEffect(() => {
        if (endpoint === null) {
            return;
        }
        navigate(endpoint, { replace: true });
        setEndpoint(null);
    }, [endpoint, navigate, setEndpoint]);

    return [setEndpoint] as const;
};
