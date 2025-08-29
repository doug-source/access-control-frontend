import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type PaginationRequester } from '@/shared/types/Contracts/PaginationRequester';
import { type RemotionRequester } from '@/shared/types/Contracts/RemotionRequester';
import { Paths } from '../types/Urls/Paths';

type PaginationParams = Parameters<PaginationRequester['paginate']>;

export class PageRequestAdapter
    implements PaginationRequester, RemotionRequester
{
    protected httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    paginate(
        token: PaginationParams[0],
        url: PaginationParams[1],
        qs: PaginationParams[2]
    ): ReturnType<HttpClient['request']> {
        const urlValue = qs ? { url, qs } : url;
        return this.httpClient.request({
            url: urlValue,
            method: 'get',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
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
