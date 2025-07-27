import { render, screen } from '@testing-library/react';
import { BrandBtn } from '.';

describe('<BrandBtn /> component', () => {
    it('renders correctly', () => {
        render(<BrandBtn>content</BrandBtn>);
        const $btn = screen.getByRole('button');
        expect($btn).toBeInTheDocument();
    });
});
