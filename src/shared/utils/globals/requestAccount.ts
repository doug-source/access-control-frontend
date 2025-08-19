import { RegisterRequestAdapter } from '@/shared/adapters/RegisterRequestAdapter';
import { RequestAccountDispatcher } from '@/shared/responsabilities/RequestAccount/Dispatcher';
import { RequestAccountErrorHandler } from '@/shared/responsabilities/RequestAccount/ErrorHandler';
import { RequestAccountReceiver } from '@/shared/responsabilities/RequestAccount/Receiver';
import { RequestAccountSuccessHandler } from '@/shared/responsabilities/RequestAccount/SuccessHandler';
import { httpClientInstance } from '@/shared/utils/globals/generic';

const requestAccountErrorHandler = new RequestAccountErrorHandler();

export const requestAccountBase = {
    dispatcher: new RequestAccountDispatcher(
        new RegisterRequestAdapter(httpClientInstance),
        new RequestAccountReceiver(
            new RequestAccountSuccessHandler(),
            requestAccountErrorHandler
        )
    ),
    errorHandler: requestAccountErrorHandler,
};
