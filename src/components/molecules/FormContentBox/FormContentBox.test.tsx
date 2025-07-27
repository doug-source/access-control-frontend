import { render, screen } from '@testing-library/react';
import { FormContentBox } from '.';

describe('<FormContentBox /> component', () => {
    it('renders correctly', () => {
        render(<FormContentBox>content</FormContentBox>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
