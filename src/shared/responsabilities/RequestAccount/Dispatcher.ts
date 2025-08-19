import type { RegisterRequestMaker } from '@/shared/types/Contracts/RegisterRequestMaker';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { RequestAccountState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['RequestAccount']['base'];
type Provide = Reference['Dispatcher']['RequestAccount']['provide'];
type Receiver = Reference['Receiver']['RequestAccount'];
type RequestOutput = Generics['RequestAccount']['request'];
type ProvideOutput = Generics['RequestAccount']['provide'];

export class RequestAccountDispatcher implements Dispatcher, Provide {
    private requestMaker: RegisterRequestMaker;
    private receiver: Receiver;

    constructor(requestMaker: RegisterRequestMaker, receiver: Receiver) {
        this.requestMaker = requestMaker;
        this.receiver = receiver;
    }

    async request(
        state: RequestAccountState,
        formData: FormData
    ): Promise<RequestAccountState> {
        const email = String(formData.get('email') ?? '').trim();
        const phone = String(formData.get('phone') ?? '').trim();
        const output = (await this.requestMaker.provide({
            email,
            ...(phone && { phone }),
        })) as RequestOutput;

        return this.receiver.receive(output, {
            ...state,
            fields: { email, phone },
        });
    }

    async provide(
        searchParams: URLSearchParams
    ): Promise<ProvideOutput | null> {
        if (searchParams.has('provided')) {
            const email = searchParams.get('provided') ?? '';
            return this.requestMaker.provide({
                email,
            }) as Promise<ProvideOutput>;
        }
        if (searchParams.has('successmsg')) {
            const message = searchParams.get('successmsg') ?? '';
            return {
                statusCode: 201,
                body: { errors: { status: [message] } },
            };
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
