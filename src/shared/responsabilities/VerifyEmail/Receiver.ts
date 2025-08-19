import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { NoFieldResponse } from '@/shared/types/Response/GateDispatcher';
import type { VerifyEmailState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';

type Receiver = Reference['Receiver']['VerifyEmail'];
type SuccessHandler = Reference['Handlers']['VerifyEmail']['Success'];
type ErrorHandler = Reference['Handlers']['VerifyEmail']['Error'];

export class VerifyEmailReceiver implements Receiver {
    private successHandler: SuccessHandler;
    private errorHandler: ErrorHandler;

    constructor(successHandler: SuccessHandler, errorHandler: ErrorHandler) {
        this.successHandler = successHandler;
        this.errorHandler = errorHandler;
    }

    receive(
        output: NoFieldResponse<unknown, 200>,
        state: VerifyEmailState
    ): VerifyEmailState {
        switch (output.statusCode) {
            case 200:
                return this.successHandler.handle(output, state);
            case 422:
            case 401:
            case 403:
                return this.errorHandler.handle(output, state);
            default:
                assertUnreachable(output);
        }
    }
}
