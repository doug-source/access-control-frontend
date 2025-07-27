import { AuthenticatorAdapter } from '@/shared/adapters/AuthenticatorAdapter';
import { FetchHttpClientAdapter } from '@/shared/adapters/FetchHttpClientAdapter';
import { RegisterRequestAdapter } from '@/shared/adapters/RegisterRequestAdapter';
import { type Authenticator } from '@/shared/types/Contracts/Authenticator';
import { type RegisterRequestMaker } from '@/shared/types/Contracts/Guest/RegisterRequestMaker';
import { type HttpClient } from '@/shared/types/Contracts/HttpClient';

export const httpClientInstance: HttpClient = new FetchHttpClientAdapter();

export const authenticatorInstance: Authenticator = new AuthenticatorAdapter(
    httpClientInstance
);

export const registerRequestMakerInstance: RegisterRequestMaker =
    new RegisterRequestAdapter(httpClientInstance);
