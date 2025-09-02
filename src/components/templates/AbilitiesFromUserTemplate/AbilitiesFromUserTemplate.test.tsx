import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import { groups } from '@/shared/utils/pagination';
import { abilitiesInitialData } from '@/shared/utils/ReduceInitialValues';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AbilitiesFromUserTemplate } from '.';

describe('<AbilitiesFromUserTemplate /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider client={httpClientInstance}>
                    <PageRequesterProvider>
                        <AbilitiesFromUserTemplate
                            state={abilitiesInitialData(1, groups[0])}
                        />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
});
