import { render, screen } from '@testing-library/react';
import { TabIndexReset } from '.';

describe('<TabIndexReset /> component', () => {
    it('renders correctly', () => {
        render(<TabIndexReset data-testid="tab-index-reset" />);
        const $el = screen.getByTestId('tab-index-reset');
        expect($el).toBeInTheDocument();
    });
});
