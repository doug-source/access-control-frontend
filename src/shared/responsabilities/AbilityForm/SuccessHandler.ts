import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { AbilityFormState } from '@/shared/types/States';

type SuccessHandler = Reference['Handlers']['AbilityForm']['Success'];
type Output = Params['SuccessHandler']['AbilityForm']['Output'];

export class AbilityFormSuccessHandler implements SuccessHandler {
    handle(_output: Output, state: AbilityFormState): AbilityFormState {
        return {
            ...state,
            fields: { name: '' },
            requestStatus: {
                statusCode: 200 as const,
                message: 'Criada com sucesso!',
            },
        };
    }
}
