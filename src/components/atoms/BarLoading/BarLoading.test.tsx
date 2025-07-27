import { render, screen } from '@testing-library/react';
import { BarLoading } from '.';

describe('<BarLoading /> component', () => {
    it('renders correctly', () => {
        render(<BarLoading>content</BarLoading>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
