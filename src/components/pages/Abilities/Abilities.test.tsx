import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Abilities } from '.';

describe('<Abilities /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Abilities />
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
