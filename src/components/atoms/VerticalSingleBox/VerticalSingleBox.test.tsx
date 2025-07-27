import { render, screen } from '@testing-library/react';
import { VerticalSingleBox } from '.';

describe('<VerticalSingleBox /> component', () => {
    it('renders correctly', () => {
        render(<VerticalSingleBox>content</VerticalSingleBox>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
