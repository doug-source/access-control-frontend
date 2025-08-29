import type { SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import type { TokenSetter } from '@/shared/types/Contracts/TokenSetter';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { RoleFormState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['RoleForm']['base'];
type Receiver = Reference['Receiver']['RoleForm'];
type RequestOutput = Generics['RoleForm']['request'];

export class RoleFormDispatcher implements Dispatcher, TokenSetter {
    private creator: SuperAdminCreator;
    private receiver: Receiver;
    private token: string | null;

    constructor(creator: SuperAdminCreator, receiver: Receiver) {
        this.creator = creator;
        this.receiver = receiver;
        this.token = null;
    }

    async request(
        state: RoleFormState,
        formData: FormData
    ): Promise<RoleFormState> {
        const name = String(formData.get('name') ?? '');
        const token = this.token ?? '';
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

    setToken(token: string) {
        this.token = token;
        return this;
    }

    abortRequest(): void {
        this.creator.abortRequest();
    }
}
