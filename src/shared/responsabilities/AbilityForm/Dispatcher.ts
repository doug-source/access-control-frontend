import type { SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import type { TokenSetter } from '@/shared/types/Contracts/TokenSetter';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { AbilityFormState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['AbilityForm']['base'];
type Receiver = Reference['Receiver']['AbilityForm'];
type RequestOutput = Generics['AbilityForm']['request'];

export class AbilityFormDispatcher implements Dispatcher, TokenSetter {
    private creator: SuperAdminCreator;
    private receiver: Receiver;
    private token: string | null;

    constructor(creator: SuperAdminCreator, receiver: Receiver) {
        this.creator = creator;
        this.receiver = receiver;
        this.token = null;
    }

    async request(
        state: AbilityFormState,
        formData: FormData
    ): Promise<AbilityFormState> {
        const name = String(formData.get('name') ?? '');
        const token = this.token ?? '';
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

    setToken(token: string) {
        this.token = token;
        return this;
    }

    abortRequest(): void {
        this.creator.abortRequest();
    }
}
