import { SelfUpdateAdapter } from '@/shared/adapters/SelfUpdateAdapter';
import { UserConfigDispatcher } from '@/shared/responsabilities/UserConfig/Dispatcher';
import { UserConfigErrorHandler } from '@/shared/responsabilities/UserConfig/ErrorHandler';
import { UserConfigReceiver } from '@/shared/responsabilities/UserConfig/Receiver';
import { UserConfigSuccessHandler } from '@/shared/responsabilities/UserConfig/SuccessHandler';
import { httpClientInstance } from './generic';

const userConfigErrorHandler = new UserConfigErrorHandler();

export const userConfigBase = {
    dispatcher: new UserConfigDispatcher(
        new SelfUpdateAdapter(httpClientInstance),
        new UserConfigReceiver(
            new UserConfigSuccessHandler(),
            userConfigErrorHandler
        )
    ),
    errorHandler: userConfigErrorHandler,
};
