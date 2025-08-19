import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { RequestAccountState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';

type Receiver = Reference['Receiver']['RequestAccount'];
type SuccessHandler = Reference['Handlers']['RequestAccount']['Success'];
type ErrorHandler = Reference['Handlers']['RequestAccount']['Error'];
type Output = Params['Receiver']['RequestAccount']['Output'];

export class RequestAccountReceiver implements Receiver {
    private successHandler: SuccessHandler;
    private errorHandler: ErrorHandler;

    constructor(successHandler: SuccessHandler, errorHandler: ErrorHandler) {
        this.successHandler = successHandler;
        this.errorHandler = errorHandler;
    }

    receive(output: Output, state: RequestAccountState): RequestAccountState {
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
                break;
        }
    }
}
