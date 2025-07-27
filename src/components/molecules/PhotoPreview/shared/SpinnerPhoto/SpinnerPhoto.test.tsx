import { render, screen } from '@testing-library/react';
import { SpinnerPhoto } from '.';

describe('<SpinnerPhoto /> component', () => {
    it('renders showing correctly', () => {
        render(<SpinnerPhoto show data-testid="key" />);
        const $el = screen.getByTestId('key');
        expect($el).toBeInTheDocument();
    });
    it('renders hidding correctly', () => {
        render(<SpinnerPhoto show={false} data-testid="key" />);
        const $el = screen.queryByTestId('key');
        expect($el).not.toBeInTheDocument();
    });
});
