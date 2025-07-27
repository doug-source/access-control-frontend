import { render, screen } from '@testing-library/react';
import { SpinnerCovering } from '.';

describe('<SpinnerCovering /> component', () => {
    it('renders correctly', () => {
        render(<SpinnerCovering show={true} data-testid="spinner" />);
        const $el = screen.getByTestId('spinner');
        expect($el).toBeInTheDocument();
    });
});
