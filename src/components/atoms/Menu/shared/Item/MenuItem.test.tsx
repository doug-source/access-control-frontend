import { render, screen } from '@testing-library/react';
import { Item } from '.';

describe('<Menu.Item /> component', () => {
    it('renders showing correctly', () => {
        render(
            <ul>
                <Item show={true}>content</Item>
            </ul>
        );
        const $el = screen.getByRole('listitem');
        expect($el).toBeInTheDocument();
    });
    it('renders hidding correctly', () => {
        render(
            <ul>
                <Item show={false}>content</Item>
            </ul>
        );
        const $el = screen.queryByRole('listitem');
        expect($el).not.toBeInTheDocument();
    });
});
