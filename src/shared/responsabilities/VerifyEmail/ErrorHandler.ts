import { HttpStatusErrorResponse } from '@/shared/types/Http/Error/Response';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { VerifyEmailState } from '@/shared/types/States';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

type ErrorHandler = Reference['Handlers']['VerifyEmail']['Error'];

export class VerifyEmailErrorHandler implements ErrorHandler {
    handle(
        output: HttpStatusErrorResponse,
        state: VerifyEmailState
    ): VerifyEmailState {
        const payload = this.detachError(output);
        return {
            ...state,
            requestStatus: {
                statusCode: 422 as const,
                type: payload.type,
                message: payload.message,
            },
        };
    }

    /**
     * Execute the response error data detaching
     */
    private detachError(output: HttpStatusErrorResponse) {
        if (output.statusCode !== 422) {
            return makeForbiddenErrorMsg('Verificação inválida!');
        }
        const {
            body: { errors },
        } = output;
        return {
            type: 'generic' as const,
            message: errors.status[0],
        };
    }
}
