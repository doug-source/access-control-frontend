import { render, screen } from '@testing-library/react';
import { GoogleIcon } from '.';

describe('<GoogleIcon /> component', () => {
    it('renders correctly', () => {
        render(<GoogleIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<GoogleIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
