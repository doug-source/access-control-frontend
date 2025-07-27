import { render, screen } from '@testing-library/react';
import { AttachIcon } from '.';

describe('<AttachIcon /> component', () => {
    it('renders correctly', () => {
        render(<AttachIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<AttachIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
