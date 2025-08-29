import { useLogicBase } from '@/shared/hooks/useLogicBase';
import { useUnmountAbortRequest } from '@/shared/hooks/useUnmountAbortRequest';
import type { VerifyEmailState } from '@/shared/types/States';
import {
    type Dispatch,
    type RefObject,
    type SetStateAction,
    useCallback,
    useRef,
} from 'react';

type SubmitHandler = (
    prevState: VerifyEmailState,
    formData: FormData
) => Promise<VerifyEmailState>;
type HookOutput = Readonly<
    [
        SubmitHandler,
        RefObject<Dispatch<SetStateAction<VerifyEmailState>> | null>
    ]
>;
type DispatchRefValue = Dispatch<SetStateAction<VerifyEmailState>>;

export const useVerifyEmailStateAction = (): HookOutput => {
    const { dispatcher } = useLogicBase<unknown, VerifyEmailState>();
    const dispatchRef = useRef<DispatchRefValue>(null);

    const submitHandler: SubmitHandler = useCallback(
        async (prevState: VerifyEmailState, formData: FormData) => {
            const promise = dispatcher.request(prevState, formData);
            const stateFromSubmit: VerifyEmailState = {
                ...(await promise),
                resend: true,
            };
            dispatchRef.current?.(stateFromSubmit);
            return stateFromSubmit;
        },
        [dispatcher, dispatchRef]
    );
    useUnmountAbortRequest(dispatcher);
    return [submitHandler, dispatchRef] as const;
};
