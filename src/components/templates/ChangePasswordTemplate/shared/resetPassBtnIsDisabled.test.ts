import { ResetPasswordState } from '@/shared/types/Reducers/Guest/ChangePassword';
import { faker } from '@faker-js/faker';
import { resetPassBtnIsDisabled } from './resetPassBtnIsDisabled';

describe('resetPassBtnIsDisabled hook', () => {
    it('runs while request is loading correctly', () => {
        const state: ResetPasswordState = {
            requestStatus: { statusCode: 0 },
            email: faker.internet.email(),
            token: faker.word.noun(),
        };
        const output = resetPassBtnIsDisabled(state, 0);
        expect(output).toBe(true);
    });
    it('runs when request is not loading correctly', () => {
        const state: ResetPasswordState = {
            requestStatus: { statusCode: -1 },
            email: faker.internet.email(),
            token: faker.word.noun(),
        };
        const output = resetPassBtnIsDisabled(state, 0);
        expect(output).toBe(false);
    });
    it('runs when email is null correctly', () => {
        const state: ResetPasswordState = {
            requestStatus: { statusCode: -1 },
            email: null,
            token: faker.word.noun(),
        };
        const output = resetPassBtnIsDisabled(state, 0);
        expect(output).toBe(true);
    });
    it('runs when token is null correctly', () => {
        const state: ResetPasswordState = {
            requestStatus: { statusCode: -1 },
            email: faker.internet.email(),
            token: null,
        };
        const output = resetPassBtnIsDisabled(state, 0);
        expect(output).toBe(true);
    });
});
