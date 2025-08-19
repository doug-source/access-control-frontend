import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { RegisterAccountState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';

type Receiver = Reference['Receiver']['RegisterAccount'];
type SuccessHandler = Reference['Handlers']['RegisterAccount']['Success'];
type ErrorHandler = Reference['Handlers']['RegisterAccount']['Error'];
type Output = Params['Receiver']['RegisterAccount']['Output'];

export class RegisterAccountReceiver implements Receiver {
    private successHandler: SuccessHandler;
    private errorHandler: ErrorHandler;

    constructor(successHandler: SuccessHandler, errorHandler: ErrorHandler) {
        this.successHandler = successHandler;
        this.errorHandler = errorHandler;
    }

    receive(output: Output, state: RegisterAccountState): RegisterAccountState {
        switch (output.statusCode) {
            case 201: {
                return this.successHandler.handle(output, state);
            }
            case 401:
            case 403:
            case 422: {
                return this.errorHandler.handle(output, state);
            }
            default:
                assertUnreachable(output);
        }
    }
}
