import type { SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import type { TokenSetter } from '@/shared/types/Contracts/TokenSetter';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { UserFormState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['UserForm']['base'];
type Receiver = Reference['Receiver']['UserForm'];
type RequestOutput = Generics['UserForm']['request'];

export class UserFormDispatcher implements Dispatcher, TokenSetter {
    private creator: SuperAdminCreator;
    private receiver: Receiver;
    private token: string | null;

    constructor(creator: SuperAdminCreator, receiver: Receiver) {
        this.creator = creator;
        this.receiver = receiver;
        this.token = null;
    }

    async request(
        state: UserFormState,
        formData: FormData
    ): Promise<UserFormState> {
        const name = String(formData.get('name') ?? '');
        const email = String(formData.get('email') ?? '');
        const password = String(formData.get('password') ?? '');
        const token = this.token ?? '';
        const output = (await this.creator.storeUser(
            '/api/users/fast/store',
            {
                name,
                email,
                password,
                password_confirmation: password,
            },
            token
        )) as RequestOutput;

        return this.receiver.receive(output, {
            ...state,
            fields: { name, email, password },
        });
    }

    setToken(token: string) {
        this.token = token;
        return this;
    }

    abortRequest(): void {
        this.creator.abortRequest();
    }
}
