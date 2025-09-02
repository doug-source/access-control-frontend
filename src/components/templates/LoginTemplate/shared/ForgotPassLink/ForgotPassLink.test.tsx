import { render, screen } from '@testing-library/react';
import { ForgotPassLink } from '.';

describe('<ForgotPassLink /> component', () => {
    it('renders correctly', () => {
        render(<ForgotPassLink />);
        expect(screen.getByRole('link')).toBeInTheDocument();
    });
});
