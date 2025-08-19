import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { RegisterAccountState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { useLoaderData } from 'react-router';

type ProvideOutput = Generics['RegisterAccount']['provide'] | null;

export const useRegisterAccountProvided = (
    state: RegisterAccountState
): RegisterAccountState => {
    const { errorHandler } = useLogicBase<
        Reference['Handlers']['RegisterAccount']['Error'],
        RegisterAccountState
    >();
    const output = useLoaderData() as ProvideOutput;
    if (typeof output === 'undefined' || output === null) {
        return state;
    }
    switch (output.statusCode) {
        case 201: {
            return {
                ...state,
                token: output.body,
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
