import { render, screen } from '@testing-library/react';
import { UsersRemovedIcon } from '.';

describe('<UsersRemovedIcon /> component', () => {
    it('renders correctly', () => {
        render(<UsersRemovedIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<UsersRemovedIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
