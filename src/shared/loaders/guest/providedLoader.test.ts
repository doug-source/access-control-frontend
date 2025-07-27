import { type Authenticator } from '@/shared/types/Contracts/Authenticator';
import { faker } from '@faker-js/faker';
import { Params } from 'react-router';
import { providedLoader } from './providedLoader';

describe('providedLoader, loader', () => {
    it('returns function', () => {
        const authenticator = {} as Authenticator;
        const output = providedLoader(authenticator);
        expect(typeof output).toBe('function');
    });
    it('returns Promise<null>', async () => {
        const authenticator = {} as Authenticator;
        const request = { url: faker.internet.url() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const output = await providedLoader(authenticator)({
            request,
            context: null,
            params,
        });
        expect(output).toBeNull();
    });
    it('returns Promise<AuthResponse>', async () => {
        const authenticator = new (class implements Authenticator {
            login(data: { email: string; password: string }): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw [data.password];
                }
                throw new Error('Method not implemented.');
            }
            logout(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
                }
                throw new Error('Method not implemented.');
            }
            async provide(token: string): Promise<unknown> {
                return {
                    statusCode: 200,
                    body: token,
                };
            }
        })();
        const url = new URL(faker.internet.url());
        const token = faker.word.noun();
        url.searchParams.set('provided', token);
        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const output = await providedLoader(authenticator)({
            request,
            context: null,
            params,
        });
        expect(output).toStrictEqual({
            statusCode: 200,
            body: token,
        });
    });
    it('returns errormsg', async () => {
        const authenticator = {} as Authenticator;
        const url = new URL(faker.internet.url());
        const errormsg = faker.word.noun();
        url.searchParams.set('errormsg', errormsg);

        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const output = await providedLoader(authenticator)({
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
