import { AuthenticatorAdapter } from '@/shared/adapters/AuthenticatorAdapter';
import { FetchHttpClientAdapter } from '@/shared/adapters/FetchHttpClientAdapter';
import { PageRequestAdapter } from '@/shared/adapters/PageRequestAdapter';
import { PageRequestWithApproveAdapter } from '@/shared/adapters/PageRequestWithApproveAdapter';
import { PageRequestWithRestoreAdapter } from '@/shared/adapters/PageRequestWithRestoreAdapter';
import { PasswordAdapter } from '@/shared/adapters/PasswordAdapter';
import { PermissionsAdapter } from '@/shared/adapters/PermissionsAdapter';
import { StoreAdapter } from '@/shared/adapters/StoreAdapter';

export const httpClientInstance = new FetchHttpClientAdapter();

export const authenticatorInstance = new AuthenticatorAdapter(
    httpClientInstance
);

export const passwordAdapterInstance = new PasswordAdapter(httpClientInstance);

export const storeAdapterInstance = new StoreAdapter(httpClientInstance);

export const pageRequester = new PageRequestAdapter(httpClientInstance);

export const restorer = new PageRequestWithRestoreAdapter(httpClientInstance);

export const approver = new PageRequestWithApproveAdapter(httpClientInstance);

export const permissionsRequester = new PermissionsAdapter(httpClientInstance);
