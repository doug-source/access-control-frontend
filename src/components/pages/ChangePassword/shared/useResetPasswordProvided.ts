import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import { ResetPasswordState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { useLoaderData } from 'react-router';

type ProvideOutput = Generics['ResetPassword']['provide'];

export const useResetPasswordProvided = (
    state: ResetPasswordState
): ResetPasswordState => {
    const output = useLoaderData() as ProvideOutput;
    const { errorHandler } = useLogicBase<
        Reference['Handlers']['ResetPassword']['Error'],
        ResetPasswordState
    >();
    switch (output.statusCode) {
        case 200: {
            return {
                ...state,
                ...output.body,
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
