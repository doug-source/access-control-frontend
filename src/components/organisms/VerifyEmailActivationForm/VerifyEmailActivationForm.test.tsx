import { render, screen } from '@testing-library/react';
import { VerifyEmailActivationForm } from '.';

describe('<VerifyEmailActivationForm /> component', () => {
    it('renders correctly', () => {
        const disabledBtn = false;
        const loading = false;
        const submitHandler = vi.fn();
        render(
            <VerifyEmailActivationForm
                disabledBtn={disabledBtn}
                loading={loading}
                show
                submitHandler={submitHandler}
            >
                content
            </VerifyEmailActivationForm>
        );
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
    it('renders with show value as falsy correctly', () => {
        const disabledBtn = false;
        const loading = false;
        const submitHandler = vi.fn();
        render(
            <VerifyEmailActivationForm
                disabledBtn={disabledBtn}
                loading={loading}
                show={false}
                submitHandler={submitHandler}
            >
                content
            </VerifyEmailActivationForm>
        );
        const $el = screen.queryByRole('form');
        expect($el).not.toBeInTheDocument();
    });
});
