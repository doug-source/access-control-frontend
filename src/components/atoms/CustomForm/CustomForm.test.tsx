import { render, screen } from '@testing-library/react';
import { CustomForm } from '.';

describe('<CustomForm /> component', () => {
    it('renders correctly', () => {
        render(<CustomForm>content</CustomForm>);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
