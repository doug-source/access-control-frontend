import { render, screen } from '@testing-library/react';
import { Divisor } from '.';

describe('<Divisor /> component', () => {
    it('renders correctly', () => {
        render(<Divisor data-testid="divisor">content</Divisor>);
        const $el = screen.getByTestId('divisor');
        expect($el).toBeInTheDocument();
    });
});
