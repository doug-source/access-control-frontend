import { render, screen } from '@testing-library/react';
import { CloseIcon } from '.';

describe('<CloseIcon /> component', () => {
    it('renders correctly', () => {
        render(<CloseIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<CloseIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
