import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Anchor } from '.';

describe('<Anchor /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Anchor to="/">Home</Anchor>
            </MemoryRouter>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
    });
});
