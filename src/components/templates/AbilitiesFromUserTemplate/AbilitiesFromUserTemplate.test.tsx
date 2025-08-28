import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { abilitiesInitialData } from '@/shared/utils/ReduceInitialValues';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AbilitiesFromUserTemplate } from '.';

describe('<AbilitiesFromUserTemplate /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <AbilitiesFromUserTemplate
                            state={abilitiesInitialData('ability-from-user', 0)}
                        />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
});
