import { render, screen } from '@testing-library/react';
import { SocialLoginLink } from '.';

describe('<SocialLoginLink /> component', () => {
    it('renders with type as primary correctly', () => {
        render(<SocialLoginLink type="primary" href='/'>content</SocialLoginLink>);
        const $el = screen.getByRole('link');
        expect($el).toBeInTheDocument();
    });
});
