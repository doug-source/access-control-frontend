import { render, screen } from '@testing-library/react';
import { ColumnBox } from '.';

describe('<ColumnBox /> component', () => {
    it('renders correctly', () => {
        render(<ColumnBox>content</ColumnBox>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
