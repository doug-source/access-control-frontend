import type { PageRequesterWithApprove } from '@/shared/types/Contracts/PageRequesterWithApprove';
import type { HttpSuccessResponse } from '@/shared/types/Http/Response';
import type { Paths } from '@/shared/types/Urls/Paths';
import { pickParamId } from '@/shared/utils/pickParamId';
import { replace, type LoaderFunctionArgs } from 'react-router';

export const approvalFromListAction = <Body = unknown, C = 200>(
    pageRequester: PageRequesterWithApprove,
    token: string,
    makeEndpoint: (id: number) => Paths['endpoint']['approvements'],
    successTarget: Paths['navigation']['lists'],
    successCallback?: (body: Body) => Promise<void>
) => {
    return async ({ params }: LoaderFunctionArgs) => {
        const id = pickParamId(params);
        const output = (await pageRequester.approve(
            token,
            makeEndpoint(id)
        )) as HttpSuccessResponse<Body, C>;
        await successCallback?.(output.body);
        const searchParam = new URLSearchParams({ action: 'approval' });
        throw replace(`${successTarget}?${searchParam.toString()}`);
    };
};
