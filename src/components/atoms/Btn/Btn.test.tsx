import { render, screen } from '@testing-library/react';
import { Btn } from '.';

describe('<Btn /> component', () => {
    it('renders showing correctly', () => {
        render(<Btn>content</Btn>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
