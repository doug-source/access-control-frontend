import type { SelfUpdate } from '@/shared/types/Contracts/SelfUpdater';
import type { TokenSetter } from '@/shared/types/Contracts/TokenSetter';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { UserConfigState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['UserConfig']['base'];
type Receiver = Reference['Receiver']['UserConfig'];
type RequestOutput = Generics['UserConfig']['request'];

export class UserConfigDispatcher implements Dispatcher, TokenSetter {
    private updater: SelfUpdate;
    private receiver: Receiver;
    private token: string | null;

    constructor(updater: SelfUpdate, receiver: Receiver) {
        this.updater = updater;
        this.receiver = receiver;
        this.token = null;
    }

    async request(
        state: UserConfigState,
        formData: FormData
    ): Promise<UserConfigState> {
        const token = this.token ?? '';
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

    setToken(token: string) {
        this.token = token;
        return this;
    }

    abortRequest(): void {
        this.updater.abortRequest();
    }
}
