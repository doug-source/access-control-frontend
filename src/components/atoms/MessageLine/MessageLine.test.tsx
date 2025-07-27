import { render, screen } from '@testing-library/react';
import { MessageLine } from '.';

describe('<MessageLine /> component', () => {
    it('renders correctly', () => {
        render(<MessageLine>content</MessageLine>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
