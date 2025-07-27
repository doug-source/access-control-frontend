import { AuthenticatorProvider } from '@/shared/providers/boxes/AuthenticatorProvider';
import { render, screen } from '@testing-library/react';
import { LogoutBtn } from '.';

describe('<LogoutBtn /> component', () => {
    it('renders correctly', () => {
        const logoutLoading = vi.fn();
        render(
            <AuthenticatorProvider>
                <LogoutBtn logoutLoading={logoutLoading} />
            </AuthenticatorProvider>
        );
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
