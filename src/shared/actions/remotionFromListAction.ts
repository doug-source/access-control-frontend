import type { PageRequester } from '@/shared/types/Contracts/PageRequester';
import type { HttpSuccessResponse } from '@/shared/types/Http/Response';
import type { Paths } from '@/shared/types/Urls/Paths';
import { pickParamId } from '@/shared/utils/pickParamId';
import { replace, type LoaderFunctionArgs } from 'react-router';

export const remotionFromListAction = <Body = unknown, C = 200>(
    pageRequester: PageRequester,
    token: string,
    makeEndpoint: (id: number) => Paths['endpoint']['remotions'],
    successTarget: Paths['navigation']['lists'],
    successCallback?: (body: Body) => Promise<void>
) => {
    return async ({ params }: LoaderFunctionArgs) => {
        const id = pickParamId(params);
        const output = (await pageRequester.remove(
            token,
            makeEndpoint(id)
        )) as HttpSuccessResponse<Body, C>;
        await successCallback?.(output.body);
        const searchParam = new URLSearchParams({ action: 'remotion' });
        throw replace(`${successTarget}?${searchParam.toString()}`);
    };
};
