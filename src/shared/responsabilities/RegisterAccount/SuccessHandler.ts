import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { RegisterAccountState } from '@/shared/types/States';

type SuccessHandler = Reference['Handlers']['RegisterAccount']['Success'];
type Output = Params['SuccessHandler']['RegisterAccount']['Output'];

export class RegisterAccountSuccessHandler implements SuccessHandler {
    handle(_output: Output, state: RegisterAccountState): RegisterAccountState {
        return {
            ...state,
            fields: { name: '', email: '', password: '', passConfirm: '' },
            requestStatus: {
                statusCode: 200 as const,
                message: 'OK',
            },
        };
    }
}
