import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { LocalNavigate } from '.';

describe('<LocalNavigate /> component', () => {
    it('renders correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/', '/home']}>
                <LocalNavigate to="/home" />
            </MemoryRouter>
        );
        expect(document.body).toBeInTheDocument();
    });
});
