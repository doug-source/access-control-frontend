import { render, screen } from '@testing-library/react';
import { Alert } from '.';

describe('<Alert /> component', () => {
    it('renders inside of document', () => {
        render(<Alert>content</Alert>);
        const $el = screen.getByRole('alert');
        expect($el).toBeInTheDocument();
    });
    it('renders with content correctly', () => {
        const content = 'The content';
        render(<Alert>{content}</Alert>);
        const $el = screen.getByRole('alert');
        expect($el).toHaveTextContent(content);
    });
    it('renders with no content correctly', () => {
        render(<Alert />);
        const $el = screen.getByRole('alert', { hidden: true });
        expect($el).not.toBeVisible();
    });
});
