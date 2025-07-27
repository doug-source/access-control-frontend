import { render, screen } from '@testing-library/react';
import { Btn } from '.';

describe('<Btn /> component', () => {
    it('renders correctly', () => {
        render(<Btn>content</Btn>);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
