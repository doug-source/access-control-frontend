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

        if (output.statusCode === 200) {
            const photo = output.body.photo ?? this.auth?.user?.photo ?? null;
            this.auth?.updateAuthUser(name, phone ?? null, photo);
        }

        return this.receiver.receive(output, {
            ...state,
            fields: {
                ...state.fields,
                name,
                phone,
            },
        });
    }

    setAuth(auth: AuthContextProvided | null) {
        this.auth = auth;
        return this;
    }
}
