import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import { Params } from '@/shared/types/Responsabilities/Params';
import { UserFormState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';

type Receiver = Reference['Receiver']['UserForm'];
type SuccessHandler = Reference['Handlers']['UserForm']['Success'];
type ErrorHandler = Reference['Handlers']['UserForm']['Error'];
type Output = Params['Receiver']['UserForm']['Output'];

export class UserFormReceiver implements Receiver {
    private successHandler: SuccessHandler;
    private errorHandler: ErrorHandler;

    constructor(successHandler: SuccessHandler, errorHandler: ErrorHandler) {
        this.successHandler = successHandler;
        this.errorHandler = errorHandler;
    }

    receive(output: Output, state: UserFormState): UserFormState {
        switch (output.statusCode) {
            case 201: {
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
