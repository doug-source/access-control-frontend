import { useAuth } from '@/shared/hooks/useAuth';
import { useLoginErrorHandler } from '@/shared/hooks/useLoginErrorHandler';
import type { LoginProvidedDispatcher } from '@/shared/types/Contracts/LoginProvidedDispatcher';
import type { State } from '@/shared/types/Reducers/Standard/State';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { useLoaderData } from 'react-router';

export const useLoginProvided = (state: State): State => {
    const errorHandler = useLoginErrorHandler();
    const output = useLoaderData() as Awaited<
        ReturnType<LoginProvidedDispatcher['provide']>
    >;
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
            return state;
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
