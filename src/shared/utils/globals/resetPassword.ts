import { ResetPasswordDispatcher } from '@/shared/responsabilities/ResetPassword/Dispatcher';
import { ResetPasswordErrorHandler } from '@/shared/responsabilities/ResetPassword/ErrorHandler';
import { ResetPasswordReceiver } from '@/shared/responsabilities/ResetPassword/Receiver';
import { ResetPasswordSuccessHandler } from '@/shared/responsabilities/ResetPassword/SuccessHandler';
import { passwordAdapterInstance } from '@/shared/utils/globals/generic';

const resetPasswordErrorHandler = new ResetPasswordErrorHandler();

export const resetPasswordBase = {
    dispatcher: new ResetPasswordDispatcher(
        passwordAdapterInstance,
        new ResetPasswordReceiver(
            new ResetPasswordSuccessHandler(),
            resetPasswordErrorHandler
        )
    ),
    errorHandler: resetPasswordErrorHandler,
};
