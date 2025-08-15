import { type RegisterRequestMaker } from '@/shared/types/Contracts/Guest/RegisterRequestMaker';
import { type RequestAccountLoaderReturn } from '@/shared/types/ReturnLoaders';
import { type LoaderFunctionArgs } from 'react-router';

export const requestAccountLoader = (
    registerRequestMaker: RegisterRequestMaker
) => {
    return async ({
        request,
    }: LoaderFunctionArgs): Promise<RequestAccountLoaderReturn> => {
        const url = new URL(request.url);

        if (url.searchParams.has('provided')) {
            const email = url.searchParams.get('provided') ?? '';
            return registerRequestMaker.provide({
                email,
            }) as Promise<RequestAccountLoaderReturn>;
        }
        if (url.searchParams.has('successmsg')) {
            const message = url.searchParams.get('successmsg') ?? '';
            return {
                statusCode: 201,
                body: { errors: { status: [message] } },
            };
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
