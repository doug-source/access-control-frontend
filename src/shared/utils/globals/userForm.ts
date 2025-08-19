import { UserFormDispatcher } from '@/shared/responsabilities/UserForm/Dispatcher';
import { UserFormErrorHandler } from '@/shared/responsabilities/UserForm/ErrorHandler';
import { UserFormReceiver } from '@/shared/responsabilities/UserForm/Receiver';
import { UserFormSuccessHandler } from '@/shared/responsabilities/UserForm/SuccessHandler';
import { storeAdapterInstance } from '@/shared/utils/globals/generic';

const userFormErrorHandler = new UserFormErrorHandler();

export const userFormBase = {
    dispatcher: new UserFormDispatcher(
        storeAdapterInstance,
        new UserFormReceiver(new UserFormSuccessHandler(), userFormErrorHandler)
    ),
    errorHandler: userFormErrorHandler,
};
