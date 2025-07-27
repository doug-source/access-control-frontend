import { render, screen } from '@testing-library/react';
import { Item } from '.';

describe('<Item /> component', () => {
    it('renders correctly', () => {
        render(<Item>content</Item>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
