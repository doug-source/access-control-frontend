import { AbilityIndex } from '@/shared/types/Models/Ability';
import { type Paths } from '@/shared/types/Urls/Paths';
import { MouseEventHandler } from 'react';
import { useLocalAttachHandler } from './useLocalAttachHandler';
import { useLocalDetachHandler } from './useLocalDetachHandler';

export const useLocalHandler = (
    pathname: Paths['navigation']['ability']
): ((ability: AbilityIndex) => MouseEventHandler<SVGSVGElement>) => {
    const attachHandler = useLocalAttachHandler();
    const detachHandler = useLocalDetachHandler();
    return (ability) => {
        return (evt) => {
            evt.stopPropagation();
            if (pathname.endsWith('/attach')) {
                attachHandler(ability);
            } else {
                detachHandler(ability);
            }
        };
    };
};
