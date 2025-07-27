import { render, screen } from '@testing-library/react';
import { Box } from '.';

describe('<Menu.Box /> component', () => {
    it('renders showing correctly', () => {
        render(
            <Box show={true}>
                <li>content</li>
            </Box>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
    it('renders hidding correctly', () => {
        render(
            <Box show={false}>
                <li>content</li>
            </Box>
        );
        const $el = screen.queryByRole('list');
        expect($el).not.toBeInTheDocument();
    });
});
