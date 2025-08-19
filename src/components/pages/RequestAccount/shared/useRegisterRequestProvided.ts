import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { RequestAccountState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { useLoaderData } from 'react-router';

type ProvideOutput = Generics['RequestAccount']['provide'] | null;

export const useRegisterRequestProvided = (
    state: RequestAccountState
): RequestAccountState => {
    const { errorHandler } = useLogicBase<
        Reference['Handlers']['RequestAccount']['Error'],
        RequestAccountState
    >();
    const output = useLoaderData() as ProvideOutput;
    if (output === null) {
        return state;
    }
    switch (output.statusCode) {
        case 201: {
            return {
                ...state,
                requestStatus: {
                    statusCode: 200 as const,
                    message: 'Requisitado!',
                },
            };
        }
        case 401:
        case 403:
        case 422: {
            return errorHandler.handle(output, state);
        }
        default:
            assertUnreachable(output);
    }
};
