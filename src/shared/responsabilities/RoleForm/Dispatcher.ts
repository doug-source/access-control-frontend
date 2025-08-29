import type { AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import type { AuthSetter } from '@/shared/types/Contracts/AuthSetter';
import type { SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { RoleFormState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['RoleForm']['base'];
type Receiver = Reference['Receiver']['RoleForm'];
type RequestOutput = Generics['RoleForm']['request'];

export class RoleFormDispatcher implements Dispatcher, AuthSetter {
    private creator: SuperAdminCreator;
    private receiver: Receiver;
    private auth: AuthContextProvided | null;

    constructor(creator: SuperAdminCreator, receiver: Receiver) {
        this.creator = creator;
        this.receiver = receiver;
        this.auth = null;
    }

    async request(
        state: RoleFormState,
        formData: FormData
    ): Promise<RoleFormState> {
        const name = String(formData.get('name') ?? '');
        const token = this.auth?.user?.token ?? '';
        const output = (await this.creator.storeRole(
            '/api/roles',
            { name },
            token
        )) as RequestOutput;

        return this.receiver.receive(output, {
            ...state,
            fields: { name },
        });
    }

    setAuth(auth: AuthContextProvided | null) {
        this.auth = auth;
        return this;
    }

    abortRequest(): void {
        this.creator.abortRequest();
    }
}
