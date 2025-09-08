import type { RoleIndex } from '@/shared/types/Models/Role';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { RolesTemplate } from '.';

describe('<RolesTemplate /> component', () => {
    it('renders correctly', () => {
        const Comp = ({ data }: { data: RoleIndex }) => {
            throw data;
        };
        render(
            <MemoryRouter initialEntries={['/']}>
                <RolesTemplate navigation="/roles" item={Comp} />
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
