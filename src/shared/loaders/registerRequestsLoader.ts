import type { PageRequesterWithApprove } from '@/shared/types/Contracts/PageRequesterWithApprove';
import type { HttpSuccessResponse } from '@/shared/types/Http/Response';
import type { Pagination } from '@/shared/types/Models/Pagination';
import type { RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import type { PaginationLoaderData } from '@/shared/types/Pagination/PaginationLoaderData';
import type { RegisterPaginations } from '@/shared/types/Urls/shared/Endpoints';
import type { ListNavigations } from '@/shared/types/Urls/shared/Navigations';
import { getPaginationKey } from '@/shared/utils/pagination';
import { redirect, replace, type LoaderFunctionArgs } from 'react-router';
import { type PaginateKeyContext } from '../types/Pagination/Keys';
import { buildLoaderPaginationQuery } from '../utils/pagination';

export const registerRequestsLoader = (
    pageRequester: PageRequesterWithApprove,
    token: string,
    navigation: ListNavigations['registerRequest'],
    endpoint: RegisterPaginations['request'],
    keyContext: PaginateKeyContext,
    id: number
) => {
    return ({
        request,
    }: LoaderFunctionArgs): PaginationLoaderData<RegisterRequestIndex> => {
        const { searchParams } = new URL(request.url);
        const queryString = buildLoaderPaginationQuery(
            searchParams,
            keyContext,
            id,
            'email'
        );
        const { page, group, email } = queryString;
        if (searchParams.size === 0) {
            throw redirect(
                `${navigation}?${new URLSearchParams({
                    page,
                    group,
                    ...(email ? { email } : null),
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
                            Pagination<RegisterRequestIndex>,
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
        if (searchParams.has('email')) {
            localStorage.removeItem(getPaginationKey(keyContext, 'page', id));
            localStorage.removeItem(getPaginationKey(keyContext, 'group', id));
            const email = searchParams.get('email')?.trim();
            if (!email) {
                localStorage.removeItem(
                    getPaginationKey(keyContext, 'email', id)
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
                    email,
                }).toString()}`
            );
        }
        // origin: from some action
        throw replace(
            `${navigation}?${new URLSearchParams({
                page,
                group,
                ...(email ? { email } : null),
            }).toString()}`
        );
    };
};
