import type { SuccessHandler } from '@/shared/types/Contracts/SuccessHandler';
import type {
    HttpSuccessResponse,
    SuccessResponseStatusCodes,
} from '@/shared/types/Http/Response';
import type { OutcomeAuthUSer } from '@/shared/types/NullableUser';
import type { State } from '@/shared/types/Reducers/Standard/State';

type Body = {
    user: OutcomeAuthUSer;
};

export class LoginSuccessHandler implements SuccessHandler<Body, State> {
    handle(
        _output: HttpSuccessResponse<Body, SuccessResponseStatusCodes>,
        state: State
    ): State {
        return {
            ...state,
            requestStatus: {
                statusCode: 200 as const,
                message: 'Logado com sucesso!',
            },
        };
    }
}
