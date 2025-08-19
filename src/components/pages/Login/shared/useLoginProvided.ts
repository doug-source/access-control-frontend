import { useAuth } from '@/shared/hooks/useAuth';
import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { LoginState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { useLoaderData } from 'react-router';

type ProvideOutput = Generics['Login']['provide'] | null;

export const useLoginProvided = (state: LoginState): LoginState => {
    const { errorHandler } = useLogicBase<
        Reference['Handlers']['Login']['Error'],
        LoginState
    >();
    const output = useLoaderData() as ProvideOutput;
    const auth = useAuth();
    if (output === null) {
        return state;
    }
    switch (output.statusCode) {
        case 200: {
            const {
                body: { user },
            } = output;
            auth?.login(user);
            return {
                ...state,
                requestStatus: { statusCode: 200, message: 'OK' },
            };
        }
        case 422:
        case 401:
        case 403: {
            return {
                ...errorHandler.handle(output, state),
            };
        }
        default:
            assertUnreachable(output);
    }
};
