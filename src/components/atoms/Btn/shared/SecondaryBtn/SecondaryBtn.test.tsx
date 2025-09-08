import { render, screen } from '@testing-library/react';
import { SecondaryBtn } from '.';

describe('<SecondaryBtn /> component', () => {
    it('renders correctly', () => {
        render(<SecondaryBtn>content</SecondaryBtn>);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
