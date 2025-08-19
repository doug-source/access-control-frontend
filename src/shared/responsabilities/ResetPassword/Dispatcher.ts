import type { ResetPasswordRequester } from '@/shared/types/Contracts/ResetPasswordRequester';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { ResetPasswordState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['ResetPassword']['base'];
type Receiver = Reference['Receiver']['ResetPassword'];
type RequestOutput = Generics['ResetPassword']['request'];
type Provide = Reference['Dispatcher']['ResetPassword']['provide'];
type ProvideOutput = Generics['ResetPassword']['provide'];

export class ResetPasswordDispatcher implements Dispatcher, Provide {
    private requester: ResetPasswordRequester;
    private receiver: Receiver;

    constructor(requester: ResetPasswordRequester, receiver: Receiver) {
        this.requester = requester;
        this.receiver = receiver;
    }

    async request(
        state: ResetPasswordState,
        formData: FormData
    ): Promise<ResetPasswordState> {
        const email = String(formData.get('email') ?? '');
        const password = String(formData.get('password') ?? '');
        const passConfirm = String(formData.get('passConfirm') ?? '');
        const token = String(formData.get('token') ?? '');
        const output = (await this.requester.reset({
            email,
            password,
            password_confirmation: passConfirm,
            token,
        })) as RequestOutput;

        return this.receiver.receive(output, {
            ...state,
            fields: { password, passConfirm },
        });
    }

    async provide(searchParams: URLSearchParams): Promise<ProvideOutput> {
        if (searchParams.has('token') && searchParams.has('email')) {
            return {
                statusCode: 200 as const,
                body: {
                    email: searchParams.get('email') ?? '',
                    token: searchParams.get('token') ?? '',
                },
            };
        }
        let message = 'Acesso Proibido';
        if (searchParams.has('errormsg')) {
            message = searchParams.get('errormsg') ?? message;
        }
        return {
            statusCode: 422 as const,
            body: { errors: { status: [message] } },
        };
    }
}
