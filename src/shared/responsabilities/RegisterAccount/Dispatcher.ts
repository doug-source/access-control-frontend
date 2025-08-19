import type { SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { RegisterAccountState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['RegisterAccount']['base'];
type Receiver = Reference['Receiver']['RegisterAccount'];
type RequestOutput = Generics['RegisterAccount']['request'];
type Provide = Reference['Dispatcher']['RegisterAccount']['provide'];
type ProvideOutput = Generics['RegisterAccount']['provide'];

export class RegisterAccountDispatcher implements Dispatcher, Provide {
    private creator: SuperAdminCreator;
    private receiver: Receiver;

    constructor(creator: SuperAdminCreator, receiver: Receiver) {
        this.creator = creator;
        this.receiver = receiver;
    }

    async request(
        state: RegisterAccountState,
        formData: FormData
    ): Promise<RegisterAccountState> {
        const name = String(formData.get('name') ?? '');
        const email = String(formData.get('email') ?? '');
        const password = String(formData.get('password') ?? '');
        const passConfirm = String(formData.get('passConfirm') ?? '');
        const token = state.token ?? '';
        const output = (await this.creator.storeUser(
            '/api/users/store',
            {
                name,
                email,
                password,
                password_confirmation: passConfirm,
            },
            token
        )) as RequestOutput;

        return this.receiver.receive(output, state);
    }

    async provide(
        searchParams: URLSearchParams
    ): Promise<ProvideOutput | null> {
        if (searchParams.has('token')) {
            return { statusCode: 201, body: searchParams.get('token') ?? '' };
        }
        if (searchParams.has('errormsg')) {
            const message = searchParams.get('errormsg') ?? '';
            return {
                statusCode: 422,
                body: { errors: { status: [message] } },
            };
        }
        return null;
    }
}
