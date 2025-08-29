import type { TokenSetter } from '@/shared/types/Contracts/TokenSetter';
import type { VerifyEmailRequester } from '@/shared/types/Contracts/VerifyEmailRequester';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { NoFieldResponse } from '@/shared/types/Response/GateDispatcher';
import type { VerifyEmailState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['VerifyEmail']['base'];
type Provide = Reference['Dispatcher']['VerifyEmail']['provide'];
type Receiver = Reference['Receiver']['VerifyEmail'];
type RequestOutput = Generics['VerifyEmail']['request'];
type ProvideOutput = Generics['VerifyEmail']['provide'];

export class VerifyEmailDispatcher implements Dispatcher, Provide, TokenSetter {
    private requester: VerifyEmailRequester;
    private receiver: Receiver;
    private token: string | null;

    constructor(requester: VerifyEmailRequester, receiver: Receiver) {
        this.requester = requester;
        this.receiver = receiver;
        this.token = null;
    }

    async request(state: VerifyEmailState): Promise<VerifyEmailState> {
        const token = this.token ?? '';
        const output = (await this.requester.resend(token)) as RequestOutput;

        return this.receiver.receive(output, state);
    }

    async provide(
        searchParams: URLSearchParams
    ): Promise<NoFieldResponse<unknown, 200> | null> {
        const token = this.token ?? '';
        if (
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

    setToken(token: string) {
        this.token = token;
        return this;
    }

    abortRequest(): void {
        this.requester.abortRequest();
    }
}
