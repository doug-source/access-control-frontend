import { render, screen } from '@testing-library/react';
import { LogoutIcon } from '.';

describe('<LogoutIcon /> component', () => {
    it('renders correctly', () => {
        render(<LogoutIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<LogoutIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
