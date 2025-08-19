import type { ResponseErrorData } from '@/shared/types/Http/Error/Response';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import { Params } from '@/shared/types/Responsabilities/Params';
import { UserFormState } from '@/shared/types/States';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

type ErrorHandler = Reference['Handlers']['UserForm']['Error'];
type Output = Params['ErrorHandler']['UserForm']['Output'];

export class UserFormErrorHandler implements ErrorHandler {
    handle(output: Output, state: UserFormState): UserFormState {
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
    private detachError(output: Output): ResponseErrorData {
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
        if (typeof errors.name !== 'undefined') {
            return {
                message: errors.name[0],
                type: 'field',
                field: 'name',
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
