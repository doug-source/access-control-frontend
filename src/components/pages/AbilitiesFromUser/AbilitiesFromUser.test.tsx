import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AbilitiesFromUser } from '.';

describe('<AbilitiesFromUser /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <AbilitiesFromUser />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
