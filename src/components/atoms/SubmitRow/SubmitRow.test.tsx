import { render, screen } from '@testing-library/react';
import { SubmitRow } from '.';

describe('<SubmitRow /> component', () => {
    it('renders correctly', () => {
        render(<SubmitRow>content</SubmitRow>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
