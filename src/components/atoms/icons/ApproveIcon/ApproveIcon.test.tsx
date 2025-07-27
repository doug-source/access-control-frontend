import { render, screen } from '@testing-library/react';
import { ApproveIcon } from '.';

describe('<ApproveIcon /> component', () => {
    it('renders correctly', () => {
        render(<ApproveIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<ApproveIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
