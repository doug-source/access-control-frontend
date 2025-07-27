import { render, screen } from '@testing-library/react';
import { PlusIcon } from '.';

describe('<PlusIcon /> component', () => {
    it('renders correctly', () => {
        render(<PlusIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<PlusIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
