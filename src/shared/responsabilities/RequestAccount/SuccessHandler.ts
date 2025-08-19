import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Params } from '@/shared/types/Responsabilities/Params';
import type { RequestAccountState } from '@/shared/types/States';

type SuccessHandler = Reference['Handlers']['RequestAccount']['Success'];
type Output = Params['SuccessHandler']['RequestAccount']['Output'];

export class RequestAccountSuccessHandler implements SuccessHandler {
    handle(_output: Output, state: RequestAccountState): RequestAccountState {
        return {
            ...state,
            fields: { email: '', phone: '' },
            requestStatus: {
                statusCode: 200 as const,
                message: 'Requisitado!',
            },
        };
    }
}
