import { render, screen } from '@testing-library/react';
import { RegisterPermissionIcon } from '.';

describe('<RegisterPermissionIcon /> component', () => {
    it('renders correctly', () => {
        render(<RegisterPermissionIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<RegisterPermissionIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
