import { render, screen } from '@testing-library/react';
import { Item } from '.';

describe('<Item /> component', () => {
    it('renders correctly', () => {
        render(
            <ul>
                <Item>content</Item>
            </ul>
        );
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
