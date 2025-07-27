import { render, screen } from '@testing-library/react';
import { CommonRow } from '.';

describe('<CommonRow /> component', () => {
    it('renders correctly', () => {
        render(<CommonRow>content</CommonRow>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
