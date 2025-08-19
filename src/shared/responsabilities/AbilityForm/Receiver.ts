import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { AbilityFormState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';

type Receiver = Reference['Receiver']['AbilityForm'];
type SuccessHandler = Reference['Handlers']['AbilityForm']['Success'];
type ErrorHandler = Reference['Handlers']['AbilityForm']['Error'];
type Output = Params['Receiver']['AbilityForm']['Output'];

export class AbilityFormReceiver implements Receiver {
    private successHandler: SuccessHandler;
    private errorHandler: ErrorHandler;

    constructor(successHandler: SuccessHandler, errorHandler: ErrorHandler) {
        this.successHandler = successHandler;
        this.errorHandler = errorHandler;
    }

    receive(output: Output, state: AbilityFormState): AbilityFormState {
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
