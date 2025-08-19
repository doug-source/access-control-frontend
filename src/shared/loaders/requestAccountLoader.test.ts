import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import { faker } from '@faker-js/faker';
import type { Params } from 'react-router';
import { requestAccountLoader } from './requestAccountLoader';

type Provide = Reference['Dispatcher']['RequestAccount']['provide'];

describe('requestAccountLoader loader', () => {
    it('returns Promise<null>', async () => {
        const dispatcher: Provide = { provide: vi.fn() };
        const request = { url: faker.internet.url() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const loader = requestAccountLoader(dispatcher);
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
        const url = new URL(faker.internet.url());
        url.searchParams.set('provided', faker.internet.email());
        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const dispatcher: Provide = { provide: vi.fn() };
        const loader = requestAccountLoader(dispatcher);
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
        const dispatcher: Provide = { provide: vi.fn() };
        const loader = requestAccountLoader(dispatcher);
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
