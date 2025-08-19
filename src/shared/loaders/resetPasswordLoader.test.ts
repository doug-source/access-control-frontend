import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import { faker } from '@faker-js/faker';
import type { Params } from 'react-router';
import { resetPasswordLoader } from './resetPasswordLoader';

type Provide = Reference['Dispatcher']['ResetPassword']['provide'];

describe('resetPasswordLoader loader', () => {
    it("returns status code 422 with 'acesso proibido' message", async () => {
        const request = { url: faker.internet.url() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const dispatcher: Provide = { provide: vi.fn() };
        const output = await resetPasswordLoader(dispatcher)({
            request,
            context: null,
            params,
        });
        expect(output).toStrictEqual({
            statusCode: 422,
            body: { errors: { status: ['Acesso Proibido'] } },
        });
    });
    it('returns status code 422 with errormsg message', async () => {
        const url = new URL(faker.internet.url());
        const errormsg = faker.word.noun();
        url.searchParams.set('errormsg', errormsg);
        const dispatcher: Provide = { provide: vi.fn() };
        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const output = await resetPasswordLoader(dispatcher)({
            request,
            context: null,
            params,
        });
        expect(output).toStrictEqual({
            statusCode: 422,
            body: { errors: { status: [errormsg] } },
        });
    });
    it('returns status code 200', async () => {
        const url = new URL(faker.internet.url());
        const token = faker.word.noun();
        const email = faker.internet.email();
        url.searchParams.set('token', token);
        url.searchParams.set('email', email);
        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const dispatcher: Provide = { provide: vi.fn() };
        const output = await resetPasswordLoader(dispatcher)({
            request,
            context: null,
            params,
        });
        expect(output).toStrictEqual({
            statusCode: 200,
            body: { email, token },
        });
    });
});
