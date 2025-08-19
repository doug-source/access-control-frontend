import { UnauthenticatorProvider } from '@/shared/providers/UnauthenticatorProvider';
import type { SignOutDispatcher } from '@/shared/types/Contracts/LogoutDispatcher';
import { render, screen } from '@testing-library/react';
import { LogoutMenuItem } from '.';

describe('<LogoutMenuItem /> component', () => {
    it('renders correctly', () => {
        const unauth: SignOutDispatcher = {
            async signOut() {
                return { statusCode: 204, body: undefined };
            },
        };
        render(
            <UnauthenticatorProvider unauthenticator={unauth}>
                <ul>
                    <LogoutMenuItem />
                </ul>
            </UnauthenticatorProvider>
        );
        const $el = screen.getByRole('listitem');
        expect($el).toBeInTheDocument();
    });
});
