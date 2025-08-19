import type { ForgotPasswordRequester } from '@/shared/types/Contracts/ForgotPasswordRequester';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { ForgotPasswordState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['ForgotPassword']['base'];
type Receiver = Reference['Receiver']['ForgotPassword'];
type RequestOutput = Generics['ForgotPassword']['request'];

export class ForgotPasswordDispatcher implements Dispatcher {
    private requester: ForgotPasswordRequester;
    private receiver: Receiver;

    constructor(requester: ForgotPasswordRequester, receiver: Receiver) {
        this.requester = requester;
        this.receiver = receiver;
    }

    async request(
        state: ForgotPasswordState,
        formData: FormData
    ): Promise<ForgotPasswordState> {
        const email = String(formData.get('email') ?? '').trim();

        const output = (await this.requester.sayYouForgot({
            email,
        })) as RequestOutput;

        return this.receiver.receive(output, {
            ...state,
            fields: { email },
        });
    }
}
