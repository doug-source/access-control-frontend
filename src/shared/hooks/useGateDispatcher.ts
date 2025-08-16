import { GateDispatcherContext } from '@/shared/contexts/GateDispatcherContext';
import { useContext } from 'react';

export const useGateDispatcher = () => {
    const dispatcher = useContext(GateDispatcherContext);
    if (dispatcher === null) {
        throw new Error('GateDispatcher invalid!');
    }
    return dispatcher;
};
