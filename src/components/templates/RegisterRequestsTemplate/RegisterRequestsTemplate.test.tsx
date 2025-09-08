import { render, screen } from '@testing-library/react';
import { RegisterRequestsTemplate } from '.';

describe('<RegisterRequestsTemplate /> component', () => {
    it('renders correctly', () => {
        render(<RegisterRequestsTemplate />);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
