import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { PaginationRequester } from '@/shared/types/Contracts/PaginationRequester';
import type { RemotionRequester } from '@/shared/types/Contracts/RemotionRequester';
import type { Paths } from '@/shared/types/Urls/Paths';

type PaginatParams = Parameters<PaginationRequester['paginate']>[number];

export class PageRequestAdapter
    implements PaginationRequester, RemotionRequester
{
    protected httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    paginate({
        token,
        url,
        qs,
        signal,
    }: PaginatParams): ReturnType<HttpClient['request']> {
        const urlValue = qs ? { url, qs } : url;
        return this.httpClient.request({
            url: urlValue,
            method: 'get',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            signal,
        });
    }

    remove(
        token: string,
        url: Paths['endpoint']['remotions']
    ): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url,
            method: 'delete',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    abortRequest(): void {
        this.httpClient.abortRequest();
    }
}
