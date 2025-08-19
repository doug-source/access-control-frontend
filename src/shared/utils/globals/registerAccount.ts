import { StoreAdapter } from '@/shared/adapters/StoreAdapter';
import { RegisterAccountDispatcher } from '@/shared/responsabilities/RegisterAccount/Dispatcher';
import { RegisterAccountErrorHandler } from '@/shared/responsabilities/RegisterAccount/ErrorHandler';
import { RegisterAccountReceiver } from '@/shared/responsabilities/RegisterAccount/Receiver';
import { RegisterAccountSuccessHandler } from '@/shared/responsabilities/RegisterAccount/SuccessHandler';
import { httpClientInstance } from './generic';

export const registerAccountErrorHandler = new RegisterAccountErrorHandler();

export const registerAccountBase = {
    dispatcher: new RegisterAccountDispatcher(
        new StoreAdapter(httpClientInstance),
        new RegisterAccountReceiver(
            new RegisterAccountSuccessHandler(),
            registerAccountErrorHandler
        )
    ),
    errorHandler: registerAccountErrorHandler,
};
