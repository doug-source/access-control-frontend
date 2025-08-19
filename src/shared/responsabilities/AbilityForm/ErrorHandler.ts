import type { ResponseErrorData } from '@/shared/types/Http/Error/Response';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { AbilityFormState } from '@/shared/types/States';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

type ErrorHandler = Reference['Handlers']['AbilityForm']['Error'];
type Output = Params['ErrorHandler']['AbilityForm']['Output'];

export class AbilityFormErrorHandler implements ErrorHandler {
    handle(output: Output, state: AbilityFormState): AbilityFormState {
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
        return {
            message: errors.name[0],
            type: 'field',
            field: 'name',
        };
    }
}
