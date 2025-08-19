import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { rolesInitialData } from '@/shared/utils/ReduceInitialValues';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { RolesTemplate } from '.';

describe('<RolesTemplate /> component', () => {
    it('renders correctly', () => {
        const state = rolesInitialData;
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <RolesTemplate state={state} />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
