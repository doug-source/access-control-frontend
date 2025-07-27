import { render, screen } from '@testing-library/react';
import { TrashIcon } from '.';

describe('<TrashIcon /> component', () => {
    it('renders correctly', () => {
        render(<TrashIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<TrashIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
