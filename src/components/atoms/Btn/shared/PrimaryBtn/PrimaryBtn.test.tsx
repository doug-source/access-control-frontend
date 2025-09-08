import { render, screen } from '@testing-library/react';
import { PrimaryBtn } from '.';

describe('<PrimaryBtn /> component', () => {
    it('renders correctly', () => {
        render(<PrimaryBtn>content</PrimaryBtn>);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
