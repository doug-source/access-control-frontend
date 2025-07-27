import { render, screen } from '@testing-library/react';
import { Input } from '.';

describe('<Input /> component', () => {
    it('renders correctly', () => {
        render(<Input />);
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
});
