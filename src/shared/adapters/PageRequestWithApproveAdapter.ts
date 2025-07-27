import { PageRequestAdapter } from '@/shared/adapters/PageRequestAdapter';
import { type Approver } from '@/shared/types/Contracts/Approver';
import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type Paths } from '@/shared/types/Urls/Paths';

export class PageRequestWithApproveAdapter
    extends PageRequestAdapter
    implements Approver
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

    approve(
        token: string,
        url: Paths['endpoint']['approvements']
    ): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url,
            method: 'delete',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }
}
