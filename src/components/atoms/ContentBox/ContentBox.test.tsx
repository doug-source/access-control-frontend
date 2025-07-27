import { render, screen } from '@testing-library/react';
import { ContentBox } from '.';

describe('<ContentBox /> component', () => {
    it('renders correctly', () => {
        render(<ContentBox>content</ContentBox>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
