import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { ForgotPasswordState } from '@/shared/types/States';

type SuccessHandler = Reference['Handlers']['ForgotPassword']['Success'];
type Output = Params['SuccessHandler']['ForgotPassword']['Output'];

export class ForgotPasswordSuccessHandler implements SuccessHandler {
    handle(_output: Output, state: ForgotPasswordState): ForgotPasswordState {
        return {
            ...state,
            fields: { email: '' },
            requestStatus: {
                statusCode: 200 as const,
                message: 'Solicitado!',
            },
        };
    }
}
