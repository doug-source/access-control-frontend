import { faker } from '@faker-js/faker';
import { Params } from 'react-router';
import { emailVerifyLoader } from './emailVerifyLoader';

describe('emailVerifyLoader loader', () => {
    it('returns null', () => {
        const request = { url: faker.internet.url() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const output = emailVerifyLoader({ request, context: null, params });
        expect(output).toBeNull();
    });
    it('returns not null', () => {
        const url = new URL(
            faker.internet.url({ appendSlash: true, protocol: 'http' })
        );
        const data = {
            expires: faker.number.int({ min: 1 }),
            signature: faker.word.noun(),
        };
        url.searchParams.set('expires', String(data.expires));
        url.searchParams.set('signature', data.signature);

        const request = { url: url.toString() } as unknown as Request;
        const params = {} as unknown as Params<string>;
        const output = emailVerifyLoader({ request, context: null, params });
        expect(output).not.toBeNull();
        expect(output).toStrictEqual(data);
    });
});
