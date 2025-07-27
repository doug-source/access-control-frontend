import { render, screen } from '@testing-library/react';
import { FormLayout } from '.';

describe('<FormLayout /> component', () => {
    it('renders correctly', () => {
        render(<FormLayout>content</FormLayout>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
