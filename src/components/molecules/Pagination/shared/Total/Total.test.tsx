import { render, screen } from '@testing-library/react';
import { Total } from '.';

describe('<Total /> component', () => {
    it('renders correctly', () => {
        const value = 7;
        render(<Total value={value} />);
        const $el = screen.getByText(`Total: ${value}`);
        expect($el).toBeInTheDocument();
    });
});
