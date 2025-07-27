import { type RegisterAccountLoaderReturn } from '@/shared/types/ReturnLoaders';
import { type LoaderFunctionArgs } from 'react-router';

export const registerAccountLoader = async ({
    request,
}: LoaderFunctionArgs): Promise<RegisterAccountLoaderReturn> => {
    const url = new URL(request.url);

    if (url.searchParams.has('token')) {
        return { statusCode: 201, body: url.searchParams.get('token') };
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
