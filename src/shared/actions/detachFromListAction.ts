import type { PermissionsRelationRequester } from '@/shared/types/Contracts/PermissionsRelationRequester';
import type { HttpSuccessResponse } from '@/shared/types/Http/Response';
import type { Paths } from '@/shared/types/Urls/Paths';
import { pickParamId } from '@/shared/utils/pickParamId';
import { replace, type LoaderFunctionArgs } from 'react-router';

export const detachFromListAction = <Body = unknown, C = 204>(
    requester: PermissionsRelationRequester,
    token: string,
    makeEndpoint: (id: number) => Paths['endpoint']['detachments'],
    successTarget: (id: number) => Paths['navigation']['lists'],
    successCallback?: (body: Body) => Promise<void>
) => {
    return async ({ params, request }: LoaderFunctionArgs) => {
        const id = pickParamId(params);
        const { searchParams } = new URL(request.url);
        const names = searchParams.getAll('names');
        if (searchParams.size > 0 && names.length > 0) {
            const output = (await requester.detach(
                token,
                makeEndpoint(id),
                names
            )) as HttpSuccessResponse<Body, C>;
            await successCallback?.(output.body);
        }
        const searchParam = new URLSearchParams({ action: 'detachment' });
        throw replace(`${successTarget(id)}?${searchParam.toString()}`);
    };
};
