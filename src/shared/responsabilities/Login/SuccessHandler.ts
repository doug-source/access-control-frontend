import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import { LoginState } from '@/shared/types/States';

type SuccessHandler = Reference['Handlers']['Login']['Success'];
type Output = Params['SuccessHandler']['Login']['Output'];

export class LoginSuccessHandler implements SuccessHandler {
    handle(_output: Output, state: LoginState): LoginState {
        return {
            ...state,
            fields: { email: '', password: '' },
            requestStatus: {
                statusCode: 200 as const,
                message: 'Logado com sucesso!',
            },
        };
    }
}
