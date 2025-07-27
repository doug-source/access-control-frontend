import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type HttpStatusCodes } from '@/shared/types/Http/Standard';
import { type CustomRequestInit } from '@/shared/types/Parameters/CustomRequestInit';
import { fetchIt } from '@/shared/utils/Fetchin';

type StatusCodes = HttpStatusCodes[keyof HttpStatusCodes];

export class FetchHttpClientAdapter implements HttpClient {
    async request(data: CustomRequestInit): Promise<unknown> {
        const response = await fetchIt(this.prepareEndpoint(data.url), {
            method: data.method,
            body: data.body,
            headers: data.headers,
            credentials: 'include',
        });
        const output = await this.makeOutput(response);
        return {
            statusCode: response.status as StatusCodes,
            body: output,
            headers: response.headers,
        };
    }

    /**
     * Prepare enpoint use by request
     */
    private prepareEndpoint(endpoint: CustomRequestInit['url']) {
        if (typeof endpoint === 'string') {
            return endpoint;
        }
        return `${endpoint.url}?${new URLSearchParams(endpoint.qs).toString()}`;
    }

    /**
     * Build the output by response status code
     */
    private async makeOutput(response: Response) {
        switch (response.status as StatusCodes) {
            case 204:
                return null;
            default:
                return response.json();
        }
    }
}
