import { type RegisterRequestMaker } from '@/shared/types/Contracts/Guest/RegisterRequestMaker';
import { faker } from '@faker-js/faker';
import { type Params } from 'react-router';
import { requestAccountLoader } from './requestAccountLoader';

describe('requestAccountLoader loader', () => {
    it('returns Promise<null>', async () => {
        const maker = {} as RegisterRequestMaker;
        const request = { url: faker.internet.url() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const loader = requestAccountLoader(maker);
        expect(typeof loader).toBe('function');
        const output = await loader({
            request,
            context: null,
            params,
        });
        expect(output).toBeNull();
    });
    it('returns Promise<RequestAccountLoaderReturn>', async () => {
        const response = {
            statusCode: 201,
        };
        const maker = new (class implements RegisterRequestMaker {
            provide(data: { email: string; phone?: string }): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.phone;
                }
                return Promise.resolve(response);
            }
        })();
        const url = new URL(faker.internet.url());
        url.searchParams.set('provided', faker.internet.email());
        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const loader = requestAccountLoader(maker);
        const output = await loader({
            request,
            context: null,
            params,
        });
        expect(output).toStrictEqual(response);
    });
    it('returns Promise<errormsg>', async () => {
        const url = new URL(faker.internet.url());
        const errormsg = faker.word.noun();
        url.searchParams.set('errormsg', errormsg);

        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const maker = {} as RegisterRequestMaker;
        const loader = requestAccountLoader(maker);
        const output = await loader({
            request,
            context: null,
            params,
        });
        expect(output).toStrictEqual({
            statusCode: 422,
            body: { errors: { status: [errormsg] } },
        });
    });
});
