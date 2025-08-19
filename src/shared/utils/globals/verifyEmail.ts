import { VerifyEmailAdapter } from '@/shared/adapters/VerifyEmailAdapter';
import { VerifyEmailDispatcher } from '@/shared/responsabilities/VerifyEmail/Dispatcher';
import { VerifyEmailErrorHandler } from '@/shared/responsabilities/VerifyEmail/ErrorHandler';
import { VerifyEmailReceiver } from '@/shared/responsabilities/VerifyEmail/Receiver';
import { VerifyEmailSuccesHandler } from '@/shared/responsabilities/VerifyEmail/SuccessHandler';
import { httpClientInstance } from './generic';

const errorHandler = new VerifyEmailErrorHandler();

export const verifyEmailBase = {
    dispatcher: new VerifyEmailDispatcher(
        new VerifyEmailAdapter(httpClientInstance),
        new VerifyEmailReceiver(new VerifyEmailSuccesHandler(), errorHandler)
    ),
    errorHandler,
};
