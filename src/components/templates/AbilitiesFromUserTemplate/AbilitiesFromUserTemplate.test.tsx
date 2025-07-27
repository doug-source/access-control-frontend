import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { abilitiesInitialData } from '@/shared/utils/ReduceInitialValues';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AbilitiesFromUserTemplate } from '.';

describe('<AbilitiesTemplate /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <AbilitiesFromUserTemplate
                            state={abilitiesInitialData}
                        />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
});
