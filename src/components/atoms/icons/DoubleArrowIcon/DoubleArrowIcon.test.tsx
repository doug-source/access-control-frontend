import { render, screen } from '@testing-library/react';
import { DoubleArrowIcon } from '.';

describe('<DoubleArrowIcon /> component', () => {
    it('renders correctly', () => {
        render(<DoubleArrowIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<DoubleArrowIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
