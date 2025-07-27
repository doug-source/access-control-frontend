import { render, screen } from '@testing-library/react';
import { UsersIcon } from '.';

describe('<UsersIcon /> component', () => {
    it('renders correctly', () => {
        render(<UsersIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<UsersIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
