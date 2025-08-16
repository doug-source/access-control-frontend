import { AuthenticatorAdapter } from '@/shared/adapters/AuthenticatorAdapter';
import { FetchHttpClientAdapter } from '@/shared/adapters/FetchHttpClientAdapter';
import { LoginDispatcher } from '@/shared/adapters/LoginDispatcher';
import { LoginErrorHandler } from '@/shared/adapters/LoginErrorHandler';
import { LoginReceiver } from '@/shared/adapters/LoginReceiver';
import { LoginSuccessHandler } from '@/shared/adapters/LoginSuccessHandler';
import { RegisterRequestAdapter } from '@/shared/adapters/RegisterRequestAdapter';
import type { Authenticator } from '@/shared/types/Contracts/Authenticator';
import type { RegisterRequestMaker } from '@/shared/types/Contracts/Guest/RegisterRequestMaker';
import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { LoginProvidedDispatcher } from '@/shared/types/Contracts/LoginProvidedDispatcher';

export const httpClientInstance: HttpClient = new FetchHttpClientAdapter();

export const authenticatorInstance: Authenticator = new AuthenticatorAdapter(
    httpClientInstance
);

export const loginProvidedInstance: LoginProvidedDispatcher =
    new LoginDispatcher(
        authenticatorInstance,
        new LoginReceiver(new LoginSuccessHandler(), new LoginErrorHandler()),
        null
    );

export const registerRequestMakerInstance: RegisterRequestMaker =
    new RegisterRequestAdapter(httpClientInstance);
