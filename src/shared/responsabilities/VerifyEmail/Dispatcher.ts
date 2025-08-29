import type { AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import type { AuthSetter } from '@/shared/types/Contracts/AuthSetter';
import type { VerifyEmailRequester } from '@/shared/types/Contracts/VerifyEmailRequester';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import { NoFieldResponse } from '@/shared/types/Response/GateDispatcher';
import type { VerifyEmailState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['VerifyEmail']['base'];
type Provide = Reference['Dispatcher']['VerifyEmail']['provide'];
type Receiver = Reference['Receiver']['VerifyEmail'];
type RequestOutput = Generics['VerifyEmail']['request'];
type ProvideOutput = Generics['VerifyEmail']['provide'];

export class VerifyEmailDispatcher implements Dispatcher, Provide, AuthSetter {
    private requester: VerifyEmailRequester;
    private receiver: Receiver;
    private auth: AuthContextProvided | null;

    constructor(requester: VerifyEmailRequester, receiver: Receiver) {
        this.requester = requester;
        this.receiver = receiver;
        this.auth = null;
    }

    async request(state: VerifyEmailState): Promise<VerifyEmailState> {
        const token = this.auth?.user?.token ?? '';
        const output = (await this.requester.resend(token)) as RequestOutput;

        return this.receiver.receive(output, state);
    }

    async provide(
        searchParams: URLSearchParams
    ): Promise<NoFieldResponse<unknown, 200> | null> {
        const token = this.auth?.user?.token ?? '';
        if (
            this.auth?.user?.emailVerified === true ||
            !searchParams.has('expires') ||
            !searchParams.has('signature') ||
            !searchParams.has('id') ||
            !searchParams.has('hash')
        ) {
            return null;
        }

        return (await this.requester.verify(
            token,
            this.pickURLSearchParams(searchParams)
        )) as Promise<ProvideOutput>;
    }

    /**
     * Convert the searchParams parameter into a record
     */
    private pickURLSearchParams(searchParams: URLSearchParams) {
        return {
            id: searchParams.get('id') ?? '',
            hash: searchParams.get('hash') ?? '',
            expires: Number(searchParams.get('expires') ?? 0),
            signature: searchParams.get('signature') ?? '',
        };
    }

    setAuth(auth: AuthContextProvided | null) {
        this.auth = auth;
        return this;
    }

    abortRequest(): void {
        this.requester.abortRequest();
    }
}
