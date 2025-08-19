import { AuthenticatorAdapter } from '@/shared/adapters/AuthenticatorAdapter';
import { FetchHttpClientAdapter } from '@/shared/adapters/FetchHttpClientAdapter';
import { PasswordAdapter } from '@/shared/adapters/PasswordAdapter';
import { StoreAdapter } from '@/shared/adapters/StoreAdapter';

export const httpClientInstance = new FetchHttpClientAdapter();

export const authenticatorInstance = new AuthenticatorAdapter(
    httpClientInstance
);

export const passwordAdapterInstance = new PasswordAdapter(httpClientInstance);

export const storeAdapterInstance = new StoreAdapter(httpClientInstance);
