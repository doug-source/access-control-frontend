import { render, screen } from '@testing-library/react';
import { Label } from '.';

describe('<Label /> component', () => {
    it('renders with show prop equal true correctly', () => {
        render(<Label show>content</Label>);
        const $el = screen.getByText('content');
        expect($el).not.toHaveClass('screen-reader-only');
        expect($el).toBeInTheDocument();
    });
    it('renders with show prop equal false correctly', () => {
        render(<Label show={false}>content</Label>);
        const $el = screen.getByText('content');
        expect($el).toHaveClass('screen-reader-only');
        expect($el).toBeInTheDocument();
    });
});
