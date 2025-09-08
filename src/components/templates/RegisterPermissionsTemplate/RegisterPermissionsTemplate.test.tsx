import { render, screen } from '@testing-library/react';
import { RegisterPermissionsTemplate } from '.';

describe('<RegisterPermissionsTemplate /> component', () => {
    it('renders correctly', () => {
        render(<RegisterPermissionsTemplate />);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
