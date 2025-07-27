import { render, screen } from '@testing-library/react';
import { ErrorIcon } from '.';

describe('<ErrorIcon /> component', () => {
    it('renders correctly', () => {
        render(<ErrorIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<ErrorIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
