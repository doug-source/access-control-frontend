import { render, screen } from '@testing-library/react';
import { RolesIcon } from '.';

describe('<RolesIcon /> component', () => {
    it('renders correctly', () => {
        render(<RolesIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<RolesIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
