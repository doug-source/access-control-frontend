import { render, screen } from '@testing-library/react';
import { SuccessIcon } from '.';

describe('<SuccessIcon /> component', () => {
    it('renders correctly', () => {
        render(<SuccessIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<SuccessIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
