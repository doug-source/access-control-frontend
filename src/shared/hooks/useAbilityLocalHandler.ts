import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type Paths } from '@/shared/types/Urls/Paths';
import { MouseEventHandler } from 'react';
import { useAbilityLocalAttachHandler } from './useAbilityLocalAttachHandler';
import { useAbilityLocalDetachHandler } from './useAbilityLocalDetachHandler';

export const useAbilityLocalHandler = (
    pathname: Paths['navigation']['ability']
): ((ability: AbilityIndex) => MouseEventHandler<SVGSVGElement>) => {
    const attachHandler = useAbilityLocalAttachHandler();
    const detachHandler = useAbilityLocalDetachHandler();
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
