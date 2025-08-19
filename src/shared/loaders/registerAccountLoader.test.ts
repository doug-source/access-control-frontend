import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import { faker } from '@faker-js/faker';
import type { Params } from 'react-router';
import { registerAccountLoader } from './registerAccountLoader';

type Provide = Reference['Dispatcher']['RegisterAccount']['provide'];

describe('registerAccountLoader loader', () => {
    it('returns null', async () => {
        const request = { url: faker.internet.url() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const dispatcher: Provide = { provide: vi.fn() };
        const output = await registerAccountLoader(dispatcher)({
            request,
            context: null,
            params,
        });
        expect(output).toBeNull();
    });
    it('returns status code equals 201', async () => {
        const url = new URL(faker.internet.url());
        const token = faker.word.noun();
        url.searchParams.set('token', token);
        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const dispatcher: Provide = { provide: vi.fn() };
        const output = await registerAccountLoader(dispatcher)({
            request,
            context: null,
            params,
        });
        expect(output).toStrictEqual({
            statusCode: 201,
            body: token,
        });
    });
    it('returns status code equals 422', async () => {
        const url = new URL(faker.internet.url());
        const errormsg = faker.word.noun();
        url.searchParams.set('errormsg', errormsg);
        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const dispatcher: Provide = { provide: vi.fn() };
        const output = await registerAccountLoader(dispatcher)({
            request,
            context: null,
            params,
        });
        expect(output).toStrictEqual({
            statusCode: 422,
            body: {
                errors: {
                    status: [errormsg],
                },
            },
        });
    });
});
