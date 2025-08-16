import type { LoginProvidedDispatcher } from '@/shared/types/Contracts/LoginProvidedDispatcher';
import type { ProvidedLoaderReturn } from '@/shared/types/ReturnLoaders';
import { LoaderFunctionArgs } from 'react-router';

export const providedLoader = (dispatcher: LoginProvidedDispatcher) => {
    return async ({
        request,
    }: LoaderFunctionArgs): Promise<ProvidedLoaderReturn> => {
        const url = new URL(request.url);
        return dispatcher.provide(url.searchParams);
    };
};
