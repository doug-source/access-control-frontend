import { render, screen } from '@testing-library/react';
import { VerifyEmailActivationForm } from '.';

describe('<VerifyEmailActivationForm /> component', () => {
    it('renders correctly', () => {
        const pending = false;
        const formAction = vi.fn();
        render(
            <VerifyEmailActivationForm
                pending={pending}
                show
                formAction={formAction}
            >
                content
            </VerifyEmailActivationForm>
        );
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
    it('renders with show value as falsy correctly', () => {
        const pending = false;
        const formAction = vi.fn();
        render(
            <VerifyEmailActivationForm
                pending={pending}
                show={false}
                formAction={formAction}
            >
                content
            </VerifyEmailActivationForm>
        );
        const $el = screen.queryByRole('form');
        expect($el).not.toBeInTheDocument();
    });
});
