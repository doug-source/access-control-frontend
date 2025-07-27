import { render, screen } from '@testing-library/react';
import { VerticalCardBox } from '.';

describe('<VerticalCardBox /> component', () => {
    it('renders correctly', () => {
        render(<VerticalCardBox data-testid="tab-index-reset" />);
        const $el = screen.getByTestId('tab-index-reset');
        expect($el).toBeInTheDocument();
    });
});
