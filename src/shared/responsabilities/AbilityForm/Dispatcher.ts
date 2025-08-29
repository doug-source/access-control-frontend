import type { AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import type { AuthSetter } from '@/shared/types/Contracts/AuthSetter';
import type { SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { AbilityFormState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['AbilityForm']['base'];
type Receiver = Reference['Receiver']['AbilityForm'];
type RequestOutput = Generics['AbilityForm']['request'];

export class AbilityFormDispatcher implements Dispatcher, AuthSetter {
    private creator: SuperAdminCreator;
    private receiver: Receiver;
    private auth: AuthContextProvided | null;

    constructor(creator: SuperAdminCreator, receiver: Receiver) {
        this.creator = creator;
        this.receiver = receiver;
        this.auth = null;
    }

    async request(
        state: AbilityFormState,
        formData: FormData
    ): Promise<AbilityFormState> {
        const name = String(formData.get('name') ?? '');
        const token = this.auth?.user?.token ?? '';
        const output = (await this.creator.storeAbility(
            '/api/abilities',
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
