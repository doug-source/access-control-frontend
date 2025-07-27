import { render, screen } from '@testing-library/react';
import { UndoIcon } from '.';

describe('<UndoIcon /> component', () => {
    it('renders correctly', () => {
        render(<UndoIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<UndoIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
