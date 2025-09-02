import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Users } from '.';

describe('<Users /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider client={httpClientInstance}>
                    <PageRequesterProvider>
                        <Users />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
