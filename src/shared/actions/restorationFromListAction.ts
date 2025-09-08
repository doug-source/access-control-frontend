import type { PageRequesterWithRestore } from '@/shared/types/Contracts/PageRequesterWithRestore';
import type { HttpSuccessResponse } from '@/shared/types/Http/Response';
import type { Paths } from '@/shared/types/Urls/Paths';
import { pickParamId } from '@/shared/utils/pickParamId';
import { replace, type LoaderFunctionArgs } from 'react-router';

export const restorationFromListAction = <Body = unknown, C = 200>(
    restorer: PageRequesterWithRestore,
    token: string,
    endpoint: Paths['endpoint']['restorations'],
    successTarget: Paths['navigation']['lists'],
    successCallback?: (body: Body) => Promise<void>
) => {
    return async ({ params }: LoaderFunctionArgs) => {
        const id = pickParamId(params);
        const output = (await restorer.restore(
            token,
            endpoint,
            id
        )) as HttpSuccessResponse<Body, C>;
        await successCallback?.(output.body);
        const searchParam = new URLSearchParams({ action: 'restoration' });
        throw replace(`${successTarget}?${searchParam.toString()}`);
    };
};
