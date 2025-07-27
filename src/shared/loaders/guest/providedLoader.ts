import { type Authenticator } from '@/shared/types/Contracts/Authenticator';
import { type AuthResponse } from '@/shared/types/Response/Auth';
import { type ProvidedLoaderReturn } from '@/shared/types/ReturnLoaders';
import { LoaderFunctionArgs } from 'react-router';

export const providedLoader = (authenticator: Authenticator) => {
    return async ({
        request,
    }: LoaderFunctionArgs): Promise<ProvidedLoaderReturn> => {
        const url = new URL(request.url);

        if (url.searchParams.has('provided')) {
            const token = url.searchParams.get('provided') ?? '';
            return authenticator.provide(token) as Promise<AuthResponse>;
        }
        if (url.searchParams.has('errormsg')) {
            const message = url.searchParams.get('errormsg') ?? '';
            return {
                statusCode: 422,
                body: { errors: { status: [message] } },
            };
        }
        return null;
    };
};
