import { useAuth } from '@/shared/hooks/useAuth';
import { useLocalLocation } from '@/shared/hooks/useLocalLocation';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { VerifyEmailState } from '@/shared/types/States';
import { verifyEmailBase } from '@/shared/utils/globals/verifyEmail';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeURLSearchParams } from './makeURLSearchParams';

type ProvideOutput = Generics['VerifyEmail']['provide'] | null;
type HookOutput = Readonly<
    [
        VerifyEmailState,
        ProvideOutput,
        Dispatch<SetStateAction<VerifyEmailState>>
    ]
>;

export const useVerifyEmailRequest = (state: VerifyEmailState): HookOutput => {
    const auth = useAuth();
    const { search } = useLocalLocation();
    const { id, hash } = useParams();
    const [output, setOutput] = useState<ProvideOutput>(null);
    const [requested, setRequested] = useState(false);
    const [currentState, setCurrentState] = useState<VerifyEmailState>({
        ...state,
        requestStatus: { statusCode: 0 as const },
    });

    useEffect(() => {
        if (requested) {
            return;
        }
        const urlSearchParams = makeURLSearchParams(
            new URLSearchParams(search),
            id,
            hash
        );
        verifyEmailBase.dispatcher.setAuth(auth);
        verifyEmailBase.dispatcher.provide(urlSearchParams).then((output) => {
            if (output === null) {
                setCurrentState((lastState) => ({
                    ...lastState,
                    requestStatus: { statusCode: -1 as const },
                }));
            }
            setOutput(output);
        });
        setRequested(true);
    }, [requested, search, id, hash, auth]);
    return [currentState, output, setCurrentState] as const;
};
