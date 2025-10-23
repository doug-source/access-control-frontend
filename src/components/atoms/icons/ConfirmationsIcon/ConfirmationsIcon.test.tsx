import { render, screen } from '@testing-library/react';
import { ConfirmationsIcon } from '.';

describe('<ConfirmationsIcon /> component', () => {
    it('renders correctly', () => {
        render(<ConfirmationsIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<ConfirmationsIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
