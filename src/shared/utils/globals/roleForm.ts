import { RoleFormDispatcher } from '@/shared/responsabilities/RoleForm/Dispatcher';
import { RoleFormErrorHandler } from '@/shared/responsabilities/RoleForm/ErrorHandler';
import { RoleFormReceiver } from '@/shared/responsabilities/RoleForm/Receiver';
import { RoleFormSuccessHandler } from '@/shared/responsabilities/RoleForm/SuccessHandler';
import { storeAdapterInstance } from '@/shared/utils/globals/generic';

const roleFormErrorHandler = new RoleFormErrorHandler();

export const roleFormBase = {
    dispatcher: new RoleFormDispatcher(
        storeAdapterInstance,
        new RoleFormReceiver(new RoleFormSuccessHandler(), roleFormErrorHandler)
    ),
    errorHandler: roleFormErrorHandler,
};
