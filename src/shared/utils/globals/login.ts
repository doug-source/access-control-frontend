import { LoginDispatcher } from '@/shared/responsabilities/Login/Dispatcher';
import { LoginErrorHandler } from '@/shared/responsabilities/Login/ErrorHandler';
import { LoginReceiver } from '@/shared/responsabilities/Login/Receiver';
import { LoginSuccessHandler } from '@/shared/responsabilities/Login/SuccessHandler';
import { authenticatorInstance } from '@/shared/utils/globals/generic';

export const loginErrorHandler = new LoginErrorHandler();

export const loginBase = {
    dispatcher: new LoginDispatcher(
        authenticatorInstance,
        new LoginReceiver(new LoginSuccessHandler(), loginErrorHandler)
    ),
    errorHandler: loginErrorHandler,
};
