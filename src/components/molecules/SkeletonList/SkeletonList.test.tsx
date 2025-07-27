import { render, screen } from '@testing-library/react';
import { SkeletonList } from '.';

describe('<SkeletonList /> component', () => {
    it('renders with true value correctly', () => {
        render(
            <SkeletonList show={true}>
                <h1>content</h1>
            </SkeletonList>
        );
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
    it('renders with false value correctly', () => {
        render(
            <SkeletonList show={false} data-testid="loading-key">
                <h1>content</h1>
            </SkeletonList>
        );
        const $el = screen.getByTestId('loading-key');
        expect($el).toBeInTheDocument();
        const $content = screen.queryByText('content');
        expect($content).not.toBeInTheDocument();
    });
});
