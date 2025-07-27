import { render, screen } from '@testing-library/react';
import { BrandIcon } from '.';

describe('<BrandIcon /> component', () => {
    it('renders correctly', () => {
        render(<BrandIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<BrandIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
