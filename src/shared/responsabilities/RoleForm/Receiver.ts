import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { RoleFormState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';

type Receiver = Reference['Receiver']['RoleForm'];
type SuccessHandler = Reference['Handlers']['RoleForm']['Success'];
type ErrorHandler = Reference['Handlers']['RoleForm']['Error'];
type Output = Params['Receiver']['RoleForm']['Output'];

export class RoleFormReceiver implements Receiver {
    private successHandler: SuccessHandler;
    private errorHandler: ErrorHandler;

    constructor(successHandler: SuccessHandler, errorHandler: ErrorHandler) {
        this.successHandler = successHandler;
        this.errorHandler = errorHandler;
    }

    receive(output: Output, state: RoleFormState): RoleFormState {
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
