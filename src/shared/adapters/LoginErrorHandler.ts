import type {
    EmailErrorField,
    PasswordErrorField,
} from '@/shared/adapters/LoginDispatcher';
import type { ErrorHandler } from '@/shared/types/Contracts/ErrorHandler';
import type { ResponseErrorData } from '@/shared/types/Http/Error/Response';
import type { State } from '@/shared/types/Reducers/Standard/State';
import type { HttpErrorResponse } from '@/shared/types/Response/GateDispatcher';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export class LoginErrorHandler
    implements ErrorHandler<State, EmailErrorField, PasswordErrorField>
{
    handle(
        output: HttpErrorResponse<EmailErrorField, PasswordErrorField>,
        state: State
    ): State {
        const payload = this.detachError(output);
        if (payload.type === 'generic') {
            return {
                ...state,
                requestStatus: {
                    statusCode: 422 as const,
                    type: payload.type,
                    message: payload.message,
                },
            };
        }
        return {
            ...state,
            requestStatus: {
                statusCode: 422 as const,
                type: payload.type,
                message: payload.message,
                field: payload.field,
            },
        };
    }

    /**
     * Execute the response error data detaching
     */
    private detachError(
        output: HttpErrorResponse<EmailErrorField, PasswordErrorField>
    ): ResponseErrorData {
        if (output.statusCode !== 422) {
            return makeForbiddenErrorMsg();
        }
        const {
            body: { errors },
        } = output;
        if ('status' in errors) {
            return {
                message: errors.status[0],
                type: 'generic',
            };
        }
        if (typeof errors.email !== 'undefined') {
            return {
                message: errors.email[0],
                type: 'field',
                field: 'email',
            };
        }
        return {
            message: errors.password[0],
            type: 'field',
            field: 'password',
        };
    }
}
