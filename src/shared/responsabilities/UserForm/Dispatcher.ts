import type { AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import type { AuthSetter } from '@/shared/types/Contracts/AuthSetter';
import type { SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { UserFormState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['UserForm']['base'];
type Receiver = Reference['Receiver']['UserForm'];
type RequestOutput = Generics['UserForm']['request'];

export class UserFormDispatcher implements Dispatcher, AuthSetter {
    private creator: SuperAdminCreator;
    private receiver: Receiver;
    private auth: AuthContextProvided | null;

    constructor(creator: SuperAdminCreator, receiver: Receiver) {
        this.creator = creator;
        this.receiver = receiver;
        this.auth = null;
    }

    async request(
        state: UserFormState,
        formData: FormData
    ): Promise<UserFormState> {
        const name = String(formData.get('name') ?? '');
        const email = String(formData.get('email') ?? '');
        const password = String(formData.get('password') ?? '');
        const token = this.auth?.user?.token ?? '';
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

    setAuth(auth: AuthContextProvided | null) {
        this.auth = auth;
        return this;
    }
}
