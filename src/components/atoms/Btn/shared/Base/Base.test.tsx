import { render, screen } from '@testing-library/react';
import { Base } from '.';

describe('<Btn /> component', () => {
    it('renders showing correctly', () => {
        render(<Base>content</Base>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
