import { render, screen } from '@testing-library/react';
import { DetachIcon } from '.';

describe('<DetachIcon /> component', () => {
    it('renders correctly', () => {
        render(<DetachIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<DetachIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
