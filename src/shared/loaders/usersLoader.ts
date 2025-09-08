import type { PageRequester } from '@/shared/types/Contracts/PageRequester';
import type { HttpSuccessResponse } from '@/shared/types/Http/Response';
import type { Pagination } from '@/shared/types/Models/Pagination';
import type { UserIndex } from '@/shared/types/Models/User';
import type { PaginationLoaderData } from '@/shared/types/Pagination/PaginationLoaderData';
import type { UserPaginations } from '@/shared/types/Urls/shared/Endpoints';
import type { ListNavigations } from '@/shared/types/Urls/shared/Navigations';
import { getPaginationKey } from '@/shared/utils/pagination';
import type { LoaderFunctionArgs } from 'react-router';
import { redirect, replace } from 'react-router';
import { type PaginateKeyContext } from '../types/Pagination/Keys';
import { buildLoaderPaginationQuery } from '../utils/pagination';

export const usersLoader = (
    pageRequester: PageRequester,
    token: string,
    navigation: ListNavigations['user'],
    endpoint: UserPaginations,
    keyContext: PaginateKeyContext,
    id: number
) => {
    return ({
        request,
    }: LoaderFunctionArgs): PaginationLoaderData<UserIndex> => {
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
                `${navigation}?${new URLSearchParams({
                    page,
                    group,
                    ...(name ? { name } : null),
                }).toString()}`
            );
        }
        if (searchParams.size > 1) {
            return {
                pagination: {
                    page: Number(page),
                    group: Number(group),
                },
                output: pageRequester
                    .paginate({
                        token,
                        url: endpoint,
                        qs: queryString,
                        signal: request.signal,
                    })
                    .then((output) => {
                        const { body } = output as HttpSuccessResponse<
                            Pagination<UserIndex>,
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
                    `${navigation}?${new URLSearchParams({
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
                `${navigation}?${new URLSearchParams({
                    page,
                    group,
                    name,
                }).toString()}`
            );
        }
        // origin: from some action
        throw replace(
            `${navigation}?${new URLSearchParams({
                page,
                group,
                ...(name ? { name } : null),
            }).toString()}`
        );
    };
};
