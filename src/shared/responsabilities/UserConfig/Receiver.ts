import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import { UserConfigState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';

type Receiver = Reference['Receiver']['UserConfig'];
type SuccessHandler = Reference['Handlers']['UserConfig']['Success'];
type ErrorHandler = Reference['Handlers']['UserConfig']['Error'];
type Output = Params['Receiver']['UserConfig']['Output'];

export class UserConfigReceiver implements Receiver {
    private successHandler: SuccessHandler;
    private errorHandler: ErrorHandler;

    constructor(successHandler: SuccessHandler, errorHandler: ErrorHandler) {
        this.successHandler = successHandler;
        this.errorHandler = errorHandler;
    }

    receive(output: Output, state: UserConfigState): UserConfigState {
        switch (output.statusCode) {
            case 200: {
                return this.successHandler.handle(output, state);
            }
            case 422:
            case 401:
            case 403: {
                return this.errorHandler.handle(output, state);
            }
            default:
                assertUnreachable(output);
        }
    }
}
