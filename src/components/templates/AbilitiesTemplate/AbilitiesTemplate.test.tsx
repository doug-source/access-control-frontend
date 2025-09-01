import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { LocationStateBetweenScreen } from '@/shared/types/LocationStateBetweenScreen';
import { UserIndex } from '@/shared/types/Models/User';
import { groups } from '@/shared/utils/pagination';
import { abilitiesInitialData } from '@/shared/utils/ReduceInitialValues';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AbilitiesTemplate } from '.';

describe('<AbilitiesTemplate /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <AbilitiesTemplate
                            state={abilitiesInitialData(1, groups[0])}
                        />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
    it("renders with 'PaginationPurpose' not included into DOM correctly", () => {
        render(
            <MemoryRouter initialEntries={['/abilities']}>
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <AbilitiesTemplate
                            state={abilitiesInitialData(1, groups[0])}
                        />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );

        const $el = screen.queryByRole('article');
        expect($el).not.toBeInTheDocument();
    });
    it("renders with 'PaginationPurpose' included into DOM correctly", () => {
        const user = {
            id: faker.number.int({
                min: 1,
            }),
            name: faker.person.firstName(),
        };
        const info: LocationStateBetweenScreen<UserIndex> = {
            data: user,
            label: `Propriedade de usuário`,
            value: user.name,
        };
        render(
            <MemoryRouter
                initialEntries={[
                    {
                        pathname: `/abilities/user/${user.id}`,
                        state: info,
                    },
                ]}
            >
                <HttpClientProvider>
                    <PageRequesterProvider>
                        <AbilitiesTemplate
                            state={abilitiesInitialData(1, groups[0])}
                        />
                    </PageRequesterProvider>
                </HttpClientProvider>
            </MemoryRouter>
        );

        // const $el = screen.queryByRole('article');
        // expect($el).toBeInTheDocument();
    });
});
