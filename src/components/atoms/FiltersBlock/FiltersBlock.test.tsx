import { render, screen } from '@testing-library/react';
import { FiltersBlock } from '.';

describe('<FiltersBlock /> component', () => {
    it('renders correctly', () => {
        render(<FiltersBlock>content</FiltersBlock>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
