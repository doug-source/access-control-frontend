import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { RoleFormState } from '@/shared/types/States';

type SuccessHandler = Reference['Handlers']['RoleForm']['Success'];
type Output = Params['SuccessHandler']['RoleForm']['Output'];

export class RoleFormSuccessHandler implements SuccessHandler {
    handle(_output: Output, state: RoleFormState): RoleFormState {
        return {
            ...state,
            fields: { name: '' },
            requestStatus: {
                statusCode: 200 as const,
                message: 'Criado com sucesso!',
            },
        };
    }
}
