import { render, screen } from '@testing-library/react';
import { Box } from '.';

describe('<Box /> component', () => {
    it('renders correctly', () => {
        render(<Box>content</Box>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
