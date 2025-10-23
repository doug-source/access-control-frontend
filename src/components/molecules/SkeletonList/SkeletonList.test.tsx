import { render, screen } from '@testing-library/react';
import { SkeletonList } from '.';

describe('<SkeletonList /> component', () => {
    it('renders with true value correctly', () => {
        render(<SkeletonList />);
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
