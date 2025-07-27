import { render, screen } from '@testing-library/react';
import { Empty } from '.';

describe('<Empty /> component', () => {
    it('renders correctly', () => {
        render(<Empty />);
        const $el = screen.getByText('Lista vazia');
        expect($el).toBeInTheDocument();
    });
});
