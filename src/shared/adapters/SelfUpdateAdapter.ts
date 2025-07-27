import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { SelfUpdate } from '@/shared/types/Contracts/SelfUpdater';

export class SelfUpdateAdapter implements SelfUpdate {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    private makeFormData(
        data: Parameters<SelfUpdate['update']>[1],
        photoToUpload: File | null
    ) {
        const formData = new FormData();
        formData.append('name', data.name);
        if (photoToUpload) {
            formData.append('photo', photoToUpload);
        }
        const phone = data.phone?.trim();
        if (phone) {
            formData.append('phone', phone);
        }
        return formData;
    }

    update(
        token: string,
        data: Parameters<SelfUpdate['update']>[1],
        photoToUpload: File | null
    ): Promise<unknown> {
        const body = this.makeFormData(data, photoToUpload);
        return this.httpClient.request({
            url: { url: '/api/users', qs: { _method: 'PATCH' } },
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                accept: 'application/json',
            },
            body,
        });
    }
}
