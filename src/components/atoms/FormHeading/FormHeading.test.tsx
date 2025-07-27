import { render, screen } from '@testing-library/react';
import { FormHeading } from '.';

describe('<FormHeading /> component', () => {
    it('renders correctly', () => {
        render(<FormHeading>content</FormHeading>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
