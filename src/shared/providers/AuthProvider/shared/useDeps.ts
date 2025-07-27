import { useAbilitiesControl } from './useAbilitiesControl';
import { useEndpoints } from './useEndpoints';

export const useDeps = () => {
    const [setEndpoints] = useEndpoints();
    const [abilities, setAbilities] = useAbilitiesControl();
    return { abilities, setAbilities, setEndpoints };
};
