import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { ResetPasswordState } from '@/shared/types/States';

type SuccessHandler = Reference['Handlers']['ResetPassword']['Success'];
type Output = Params['SuccessHandler']['ResetPassword']['Output'];

export class ResetPasswordSuccessHandler implements SuccessHandler {
    handle(_output: Output, state: ResetPasswordState): ResetPasswordState {
        return {
            ...state,
            fields: { password: '', passConfirm: '' },
            requestStatus: {
                statusCode: 200 as const,
                message: 'OK',
            },
        };
    }
}
