import type { AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import type { AuthSetter } from '@/shared/types/Contracts/AuthSetter';
import type { SelfUpdate } from '@/shared/types/Contracts/SelfUpdater';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { UserConfigState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['UserConfig']['base'];
type Receiver = Reference['Receiver']['UserConfig'];
type RequestOutput = Generics['UserConfig']['request'];

export class UserConfigDispatcher implements Dispatcher, AuthSetter {
    private updater: SelfUpdate;
    private receiver: Receiver;
    private auth: AuthContextProvided | null;

    constructor(updater: SelfUpdate, receiver: Receiver) {
        this.updater = updater;
        this.receiver = receiver;
        this.auth = null;
    }

    async request(
        state: UserConfigState,
        formData: FormData
    ): Promise<UserConfigState> {
        const token = this.auth?.user?.token ?? '';
        const name = String(formData.get('name') ?? '');
        const phone = String(formData.get('phone') ?? '');
        const output = (await this.updater.update(
            token,
            formData
        )) as RequestOutput;

        return this.receiver.receive(output, {
            ...state,
            fields: {
                ...state.fields,
                name,
                phone,
                photo: this.extractPhoto(output),
            },
        });
    }

    private extractPhoto(output: RequestOutput) {
        if (output.statusCode === 200) {
            return output.body.photo ?? null;
        }
        return null;
    }

    setAuth(auth: AuthContextProvided | null) {
        this.auth = auth;
        return this;
    }

    abortRequest(): void {
        this.updater.abortRequest();
    }
}
