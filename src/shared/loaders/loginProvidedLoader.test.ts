import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { Generics } from '@/shared/types/Responsabilities/Outputs';
import { faker } from '@faker-js/faker';
import type { Params } from 'react-router';
import { loginProvidedLoader } from './loginProvidedLoader';

type Provide = Reference['Dispatcher']['Login']['provide'];
type ProvideOutput = Generics['Login']['provide'] | null;

describe('providedLoader, loader', () => {
    it('returns function', () => {
        const authenticator = {} as Provide;
        const output = loginProvidedLoader(authenticator);
        expect(typeof output).toBe('function');
    });
    it('returns Promise<null>', async () => {
        const authenticator = {} as Provide;
        const request = { url: faker.internet.url() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const output = await loginProvidedLoader(authenticator)({
            request,
            context: null,
            params,
        });
        expect(output).toBeNull();
    });
    it('returns Promise<AuthResponse>', async () => {
        const authenticator = new (class implements Provide {
            async provide(
                searchParams: URLSearchParams
            ): Promise<ProvideOutput> {
                if (typeof searchParams === 'undefined') {
                    throw searchParams;
                }
                return {
                    statusCode: 200,
                    body: {
                        user: {
                            abilities: [],
                            id: faker.number.int({ min: 1 }).toString(),
                            email: faker.internet.email(),
                            emailVerified: true,
                            name: faker.person.firstName(),
                            token: faker.word.noun(),
                            phone: null,
                            photo: null,
                        },
                    },
                };
            }
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
        })();
        const url = new URL(faker.internet.url());
        const token = faker.word.noun();
        url.searchParams.set('provided', token);
        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const output = await loginProvidedLoader(authenticator)({
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
        const authenticator = {} as Provide;
        const url = new URL(faker.internet.url());
        const errormsg = faker.word.noun();
        url.searchParams.set('errormsg', errormsg);

        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const output = await loginProvidedLoader(authenticator)({
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
