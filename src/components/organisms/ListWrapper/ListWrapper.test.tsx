import { render, screen } from '@testing-library/react';
import { ListWrapper } from '.';

describe('<ListWrapper /> component', () => {
    it('renders correctly', () => {
        render(
            <ListWrapper requestType="list">
                <li>content</li>
            </ListWrapper>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
