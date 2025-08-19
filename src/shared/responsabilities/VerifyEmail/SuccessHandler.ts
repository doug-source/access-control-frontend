import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { VerifyEmailState } from '@/shared/types/States';

type SuccessHandler = Reference['Handlers']['VerifyEmail']['Success'];
type Output = Params['SuccessHandler']['VerifyEmail']['Output'];

export class VerifyEmailSuccesHandler implements SuccessHandler {
    handle(_output: Output, state: VerifyEmailState): VerifyEmailState {
        return {
            ...state,
            requestStatus: {
                statusCode: 200 as const,
                message: 'Email enviado!',
            },
        };
    }
}
