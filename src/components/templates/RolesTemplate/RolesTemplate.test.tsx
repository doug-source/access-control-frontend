import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import { groups } from '@/shared/utils/pagination';
import { rolesInitialData } from '@/shared/utils/ReduceInitialValues';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { RolesTemplate } from '.';

describe('<RolesTemplate /> component', () => {
    it('renders correctly', () => {
        const state = rolesInitialData(1, groups[0]);
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider client={httpClientInstance}>
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
