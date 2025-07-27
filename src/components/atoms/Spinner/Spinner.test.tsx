import { render, screen } from '@testing-library/react';
import { Spinner } from '.';

describe('<Spinner /> component', () => {
    it('renders correctly', () => {
        render(<Spinner data-testid="spinner" />);
        const $el = screen.getByTestId('spinner');
        expect($el).toBeInTheDocument();
    });
});
