import { render, screen } from '@testing-library/react';
import { LoadingIcon } from '.';

describe('<LoadingIcon /> component', () => {
    it('renders correctly', () => {
        render(<LoadingIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<LoadingIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
