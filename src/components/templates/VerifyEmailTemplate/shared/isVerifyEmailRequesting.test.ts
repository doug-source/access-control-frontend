import { faker } from '@faker-js/faker';
import { isVerifyEmailRequesting } from './isVerifyEmailRequesting';

describe('isVerifyEmailRequesting function', () => {
    it('renders is not VerifyEmail request correctly', () => {
        expect(
            isVerifyEmailRequesting(
                {
                    statusCode: 422,
                    type: 'generic',
                    message: faker.word.noun(),
                },
                {}
            )
        ).toBeFalsy();
    });
    it('renders is VerifyEmail request correctly', () => {
        expect(
            isVerifyEmailRequesting(
                {
                    statusCode: -1,
                },
                { id: faker.number.int().toString(), hash: faker.word.noun() }
            )
        ).toBeTruthy();
    });
});
