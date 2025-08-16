import type {
    Body,
    EmailErrorField,
    PasswordErrorField,
} from '@/shared/adapters/LoginDispatcher';
import type { ErrorHandler } from '@/shared/types/Contracts/ErrorHandler';
import type { Receiver } from '@/shared/types/Contracts/Receiver';
import type { SuccessHandler } from '@/shared/types/Contracts/SuccessHandler';
import type { State } from '@/shared/types/Reducers/Standard/State';
import type { GenericResponse } from '@/shared/types/Response/GateDispatcher';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { HttpStatusCodes } from '../types/Http/Standard';

export class LoginReceiver
    implements
        Receiver<
            State,
            Body,
            HttpStatusCodes['OK'],
            EmailErrorField,
            PasswordErrorField
        >
{
    private successHandler: SuccessHandler<Body, State>;
    private errorHandler: ErrorHandler<
        State,
        EmailErrorField,
        PasswordErrorField
    >;

    constructor(
        successHandler: SuccessHandler<Body, State>,
        errorHandler: ErrorHandler<State, EmailErrorField, PasswordErrorField>
    ) {
        this.successHandler = successHandler;
        this.errorHandler = errorHandler;
    }

    receive(
        output: GenericResponse<
            Body,
            HttpStatusCodes['OK'],
            EmailErrorField,
            PasswordErrorField
        >,
        state: State
    ): State {
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
