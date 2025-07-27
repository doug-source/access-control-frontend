import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Roles } from '.';

describe('<Roles /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <Roles />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
