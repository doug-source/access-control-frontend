import { faker } from '@faker-js/faker';
import { renderNotice } from './renderNotice';

describe('renderNotice function', () => {
    it('runs complete return correctly', () => {
        const field = faker.word.noun();
        const message = faker.word.noun();
        const output = renderNotice(
            {
                statusCode: 422,
                type: 'field',
                field,
                message,
            },
            field
        );
        expect(typeof output.show).toBe('boolean');
        expect(typeof output.msg).toBe('string');
        expect(output.show).toBeTruthy();
        expect(output.msg).toBe(message);
    });
    it('runs non-complete return correctly', () => {
        const field = faker.word.noun();
        const output = renderNotice(
            {
                statusCode: 200,
                message: faker.word.noun(),
            },
            field
        );
        expect(typeof output.show).toBe('boolean');
        expect(typeof output.msg).toBe('undefined');
        expect(output.show).toBeFalsy();
    });
});
