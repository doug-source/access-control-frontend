import type { Viewers } from '@/shared/types/Urls/shared/Endpoints';
import { viewerInstance } from '@/shared/utils/globals/viewer';
import { pickParamId } from '@/shared/utils/pickParamId';
import type { LoaderFunctionArgs } from 'react-router';

export const subjectShowLoader = (
    token: string,
    makeEndpoint: (id: number) => Viewers
) => {
    return ({ request, params }: LoaderFunctionArgs) => {
        const id = pickParamId(params);
        const endpoint = makeEndpoint(id);
        const output = viewerInstance.show(endpoint, token, request.signal);

        return { output };
    };
};
