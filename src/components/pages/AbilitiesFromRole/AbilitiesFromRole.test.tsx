import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AbilitiesFromRole } from '.';

describe('<AbilitiesFromRole /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <AbilitiesFromRole />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
