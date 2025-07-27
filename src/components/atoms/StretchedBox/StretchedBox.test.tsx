import { render, screen } from '@testing-library/react';
import { StretchedBox } from '.';

describe('<StretchedBox /> component', () => {
    it('renders correctly', () => {
        render(<StretchedBox>content</StretchedBox>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
