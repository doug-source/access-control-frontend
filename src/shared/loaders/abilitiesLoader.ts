import type { PageRequester } from '@/shared/types/Contracts/PageRequester';
import type { Viewer } from '@/shared/types/Contracts/Viewer';
import type { HttpSuccessResponse } from '@/shared/types/Http/Response';
import type { AbilityIndex } from '@/shared/types/Models/Ability';
import type { Pagination } from '@/shared/types/Models/Pagination';
import type { PaginationLoaderData } from '@/shared/types/Pagination/PaginationLoaderData';
import type { AbilityPaginations } from '@/shared/types/Urls/shared/Endpoints';
import type { ListNavigations } from '@/shared/types/Urls/shared/Navigations';
import { getPaginationKey } from '@/shared/utils/pagination';
import { pickParamId } from '@/shared/utils/pickParamId';
import { redirect, replace, type LoaderFunctionArgs } from 'react-router';
import { type PaginateKeyContext } from '../types/Pagination/Keys';
import { buildLoaderPaginationQuery } from '../utils/pagination';

export const abilitiesLoader = (
    pageRequester: PageRequester,
    viewer: Viewer,
    token: string,
    navigation: (id: number) => ListNavigations['ability'],
    endpoint: (id: number) => AbilityPaginations,
    keyContext: PaginateKeyContext,
    id: number
) => {
    return ({
        request,
        params,
    }: LoaderFunctionArgs): PaginationLoaderData<AbilityIndex> => {
        let idFromParams = Number(params.id);
        let userPromise: Promise<{ body: unknown } | null> =
            Promise.resolve(null);
        if (typeof params.id !== 'undefined') {
            idFromParams = pickParamId(params);
        }
        const navigationParsed = navigation(idFromParams);
        const endpointParsed = endpoint(idFromParams);

        const { searchParams } = new URL(request.url);
        const queryString = buildLoaderPaginationQuery(
            searchParams,
            keyContext,
            id,
            'name'
        );
        const { page, group, name } = queryString;
        if (searchParams.size === 0) {
            throw redirect(
                `${navigationParsed}?${new URLSearchParams({
                    page,
                    group,
                    ...(name ? { name } : null),
                }).toString()}`
            );
        }
        if (searchParams.size > 1) {
            if (!Number.isNaN(idFromParams)) {
                const subjectEndpoint = `/api/${
                    keyContext.includes('user') ? 'users' : 'roles'
                }/${idFromParams}` as const;
                userPromise = viewer.show(
                    subjectEndpoint,
                    token,
                    request.signal
                ) as Promise<{ body: unknown }>;
            }
            const qs: typeof queryString & { owner: string } = Object.assign(
                queryString,
                { owner: navigationParsed.endsWith('/attach') ? 'no' : 'yes' }
            );
            return {
                pagination: {
                    page: Number(page),
                    group: Number(group),
                },
                data: userPromise,
                output: pageRequester
                    .paginate({
                        token,
                        url: endpointParsed,
                        qs,
                        signal: request.signal,
                    })
                    .then((output) => {
                        const { body } = output as HttpSuccessResponse<
                            Pagination<AbilityIndex>,
                            200
                        >;
                        return {
                            data: body.data,
                            lastPage: body.last_page,
                            total: body.total,
                        };
                    }),
            };
        }
        if (searchParams.has('name')) {
            localStorage.removeItem(getPaginationKey(keyContext, 'page', id));
            localStorage.removeItem(getPaginationKey(keyContext, 'group', id));
            const name = searchParams.get('name')?.trim();
            if (!name) {
                localStorage.removeItem(
                    getPaginationKey(keyContext, 'name', id)
                );
                const { page, group } = buildLoaderPaginationQuery(
                    searchParams,
                    keyContext,
                    id
                );
                throw replace(
                    `${navigationParsed}?${new URLSearchParams({
                        page,
                        group,
                    }).toString()}`
                );
            }
            const { page, group } = buildLoaderPaginationQuery(
                searchParams,
                keyContext,
                id
            );
            throw replace(
                `${navigationParsed}?${new URLSearchParams({
                    page,
                    group,
                    name,
                }).toString()}`
            );
        }
        // origin: from some action
        throw replace(
            `${navigationParsed}?${new URLSearchParams({
                page,
                group,
                ...(name ? { name } : null),
            }).toString()}`
        );
    };
};
