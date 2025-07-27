import { type LoaderFunction } from 'react-router';

export const emailVerifyLoader: LoaderFunction = ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.has('expires') && url.searchParams.has('signature')) {
        return {
            expires: Number(url.searchParams.get('expires')),
            signature: url.searchParams.get('signature') ?? '',
        };
    }
    return null;
};
