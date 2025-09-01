import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { type AbilitiesState } from '@/shared/types/Reducers/Abilities';
import { groups } from '@/shared/utils/pagination';
import { abilitiesInitialData } from '@/shared/utils/ReduceInitialValues';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AbilitiesFromRoleTemplate } from '.';

describe('<AbilitiesFromRoleTemplate /> component', () => {
    it('renders correctly', () => {
        const state: AbilitiesState = abilitiesInitialData(1, groups[0]);
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <AbilitiesFromRoleTemplate state={state} />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
});
