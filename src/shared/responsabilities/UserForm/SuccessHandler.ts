import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import { Params } from '@/shared/types/Responsabilities/Params';
import { UserFormState } from '@/shared/types/States';

type SuccessHandler = Reference['Handlers']['UserForm']['Success'];
type Output = Params['SuccessHandler']['UserForm']['Output'];

export class UserFormSuccessHandler implements SuccessHandler {
    handle(_output: Output, state: UserFormState): UserFormState {
        return {
            ...state,
            fields: { name: '', email: '', password: '' },
            requestStatus: {
                statusCode: 200 as const,
                message: 'Criado com sucesso!',
            },
        };
    }
}
