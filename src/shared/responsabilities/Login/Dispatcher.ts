import type { AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import type { Authenticator } from '@/shared/types/Contracts/Authenticator';
import type { AuthSetter } from '@/shared/types/Contracts/AuthSetter';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import type { LoginState } from '@/shared/types/States';

type Dispatcher = Reference['Dispatcher']['Login']['base'];
type Provide = Reference['Dispatcher']['Login']['provide'];
type SignOut = Reference['Dispatcher']['Login']['signOut'];
type Receiver = Reference['Receiver']['Login'];
type RequestOutput = Generics['Login']['request'];
type ProvideOutput = Generics['Login']['provide'];
type SignOutOutput = Generics['Login']['signOut'];

export class LoginDispatcher
    implements Dispatcher, Provide, AuthSetter, SignOut
{
    private authenticator: Authenticator;
    private receiver: Receiver;
    private auth: AuthContextProvided | null;

    constructor(authenticator: Authenticator, receiver: Receiver) {
        this.authenticator = authenticator;
        this.receiver = receiver;
        this.auth = null;
    }

    async request(state: LoginState, formData: FormData): Promise<LoginState> {
        const email = String(formData.get('email') ?? '').trim();
        const password = String(formData.get('password') ?? '');
        const output = (await this.authenticator.login({
            email,
            password,
        })) as RequestOutput;

        return this.receiver.receive(output, {
            ...state,
            user: output.statusCode === 200 ? output.body.user : null,
            fields: { email, password },
        });
    }

    async provide(
        searchParams: URLSearchParams
    ): Promise<ProvideOutput | null> {
        if (searchParams.has('provided')) {
            const token = searchParams.get('provided') ?? '';
            return this.authenticator.provide(token) as Promise<ProvideOutput>;
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

    setAuth(auth: AuthContextProvided | null) {
        this.auth = auth;
        return this;
    }

    signOut(): Promise<SignOutOutput> {
        const token = this.auth?.user?.token;
        if (!token) {
            return Promise.resolve({
                body: undefined,
                statusCode: 204,
            });
        }
        return this.authenticator.logout(token) as Promise<SignOutOutput>;
    }

    abortRequest(): void {
        this.authenticator.abortRequest();
    }
}
