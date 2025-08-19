import { ForgotPasswordDispatcher } from '@/shared/responsabilities/ForgotPassword/Dispatcher';
import { ForgotPasswordErrorHandler } from '@/shared/responsabilities/ForgotPassword/ErrorHandler';
import { ForgotPasswordReceiver } from '@/shared/responsabilities/ForgotPassword/Receiver';
import { ForgotPasswordSuccessHandler } from '@/shared/responsabilities/ForgotPassword/SuccessHandler';
import { passwordAdapterInstance } from '@/shared/utils/globals/generic';

const forgotPasswordErrorHandler = new ForgotPasswordErrorHandler();

export const forgotPasswordBase = {
    dispatcher: new ForgotPasswordDispatcher(
        passwordAdapterInstance,
        new ForgotPasswordReceiver(
            new ForgotPasswordSuccessHandler(),
            forgotPasswordErrorHandler
        )
    ),
    errorHandler: forgotPasswordErrorHandler,
};
