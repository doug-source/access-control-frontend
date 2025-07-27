import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { RegisterPermissions } from '.';

describe('<RegisterPermissions /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <RegisterPermissions />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
