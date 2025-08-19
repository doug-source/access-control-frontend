import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { ResetPasswordState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';

type Receiver = Reference['Receiver']['ResetPassword'];
type SuccessHandler = Reference['Handlers']['ResetPassword']['Success'];
type ErrorHandler = Reference['Handlers']['ResetPassword']['Error'];
type Output = Params['Receiver']['ResetPassword']['Output'];

export class ResetPasswordReceiver implements Receiver {
    private successHandler: SuccessHandler;
    private errorHandler: ErrorHandler;

    constructor(successHandler: SuccessHandler, errorHandler: ErrorHandler) {
        this.successHandler = successHandler;
        this.errorHandler = errorHandler;
    }

    receive(output: Output, state: ResetPasswordState): ResetPasswordState {
        switch (output.statusCode) {
            case 200: {
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
