import type { AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import type { Authenticator } from '@/shared/types/Contracts/Authenticator';
import type { GateDispatcher } from '@/shared/types/Contracts/GateDispatcher';
import type { LoginProvidedDispatcher } from '@/shared/types/Contracts/LoginProvidedDispatcher';
import type { Receiver } from '@/shared/types/Contracts/Receiver';
import type { HttpSuccessResponse } from '@/shared/types/Http/Response';
import type { HttpStatusCodes } from '@/shared/types/Http/Standard';
import type { OutcomeAuthUSer } from '@/shared/types/NullableUser';
import type { State } from '@/shared/types/Reducers/Standard/State';
import type { GenericResponse } from '@/shared/types/Response/GateDispatcher';

export type Body = { user: OutcomeAuthUSer };
export type EmailErrorField = { email: [string] };
export type PasswordErrorField = { password: [string] };

export class LoginDispatcher
    implements GateDispatcher, LoginProvidedDispatcher
{
    private authenticator: Authenticator;
    private receiver: Receiver<
        State,
        Body,
        HttpStatusCodes['OK'],
        EmailErrorField,
        PasswordErrorField
    >;
    private auth: AuthContextProvided | null;

    constructor(
        authenticator: Authenticator,
        receiver: Receiver<
            State,
            Body,
            HttpStatusCodes['OK'],
            EmailErrorField,
            PasswordErrorField
        >
    ) {
        this.authenticator = authenticator;
        this.receiver = receiver;
        this.auth = null;
    }

    /**
     * Authenticate inside of frontend storage
     */
    private appAuth({ user }: Body) {
        setTimeout(() => {
            this.auth?.login(user);
        }, 1500);
    }

    async request(state: State, formData: FormData): Promise<State> {
        const email = formData.get('email') ?? '';
        const password = formData.get('password') ?? '';
        if (typeof email !== 'string' || typeof password !== 'string') {
            return state;
        }
        const output = (await this.authenticator.login({
            email,
            password,
        })) as GenericResponse<
            Body,
            HttpStatusCodes['OK'],
            EmailErrorField,
            PasswordErrorField
        >;

        if (output.statusCode === 200) {
            this.appAuth(output.body);
        }
        return this.receiver.receive(output, state);
    }

    async provide(
        searchParams: URLSearchParams
    ): ReturnType<LoginProvidedDispatcher['provide']> {
        if (searchParams.has('provided')) {
            const token = searchParams.get('provided') ?? '';
            return this.authenticator.provide(token) as Promise<
                HttpSuccessResponse<Body>
            >;
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

    /**
     * Define the inner auth instance
     */
    setPath(auth: AuthContextProvided | null) {
        this.auth = auth;
        return this;
    }
}
