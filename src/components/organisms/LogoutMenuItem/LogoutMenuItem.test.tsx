import { AuthenticatorProvider } from '@/shared/providers/boxes/AuthenticatorProvider';
import { render, screen } from '@testing-library/react';
import { LogoutMenuItem } from '.';

describe('<LogoutMenuItem /> component', () => {
    it('renders correctly', () => {
        render(
            <AuthenticatorProvider>
                <ul>
                    <LogoutMenuItem />
                </ul>
            </AuthenticatorProvider>
        );
        const $el = screen.getByRole('listitem');
        expect($el).toBeInTheDocument();
    });
});
