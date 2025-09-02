import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useLogicBase } from '@/shared/hooks/useLogicBase';
import { useSignState } from '@/shared/hooks/useSignState';
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
    const { dispatch } = useSignState();
    const navigate = useLocalNavigate();
    if (output === null) {
        return state;
    }
    switch (output.statusCode) {
        case 200: {
            const {
                body: { user },
            } = output;
            dispatch({ type: 'SIGN_IN', payload: user });
            navigate('/home', { replace: true });
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
