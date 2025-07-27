import { PageRequestAdapter } from '@/shared/adapters/PageRequestAdapter';
import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type RestorationRequest } from '@/shared/types/Contracts/RestorationRequest';
import { type Paths } from '@/shared/types/Urls/Paths';

export class PageRequestWithRestoreAdapter
    extends PageRequestAdapter
    implements RestorationRequest
{
    restore(
        token: string,
        url: Paths['endpoint']['restorations'],
        id: number
    ): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url,
            method: 'post',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
    }
}
