import { type ResetPasswordLoaderReturn } from '@/shared/types/ReturnLoaders';
import { type LoaderFunctionArgs } from 'react-router';

export const resetPasswordLoader = async ({
    request,
}: LoaderFunctionArgs): Promise<ResetPasswordLoaderReturn> => {
    const url = new URL(request.url);

    if (url.searchParams.has('token') && url.searchParams.has('email')) {
        return {
            statusCode: 200,
            body: {
                email: url.searchParams.get('email') ?? '',
                token: url.searchParams.get('token') ?? '',
            },
        };
    }
    let message = 'Acesso Proibido';
    if (url.searchParams.has('errormsg')) {
        message = url.searchParams.get('errormsg') ?? message;
    }
    return {
        statusCode: 422,
        body: { errors: { status: [message] } },
    };
};
