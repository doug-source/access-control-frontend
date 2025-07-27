import { render, screen } from '@testing-library/react';
import { Backdrop } from '.';

describe('<Backdrop /> component', () => {
    it('renders showing correctly', () => {
        render(<Backdrop show>content</Backdrop>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
    it('renders showing correctly', () => {
        render(<Backdrop show={false}>content</Backdrop>);
        const $el = screen.queryByText('content');
        expect($el).not.toBeInTheDocument();
    });
});
