import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type Viewer } from '@/shared/types/Contracts/Viewer';
import { type Paths } from '@/shared/types/Urls/Paths';

export class ViewerAdapter implements Viewer {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    show(
        url: Paths['endpoint']['viewers'],
        token: string
    ): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url,
            method: 'get',
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
