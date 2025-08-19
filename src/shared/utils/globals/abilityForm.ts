import { AbilityFormDispatcher } from '@/shared/responsabilities/AbilityForm/Dispatcher';
import { AbilityFormErrorHandler } from '@/shared/responsabilities/AbilityForm/ErrorHandler';
import { AbilityFormReceiver } from '@/shared/responsabilities/AbilityForm/Receiver';
import { AbilityFormSuccessHandler } from '@/shared/responsabilities/AbilityForm/SuccessHandler';
import { storeAdapterInstance } from '@/shared/utils/globals/generic';

const abilityFormErrorHandler = new AbilityFormErrorHandler();

export const abilityFormBase = {
    dispatcher: new AbilityFormDispatcher(
        storeAdapterInstance,
        new AbilityFormReceiver(
            new AbilityFormSuccessHandler(),
            abilityFormErrorHandler
        )
    ),
    errorHandler: abilityFormErrorHandler,
};
