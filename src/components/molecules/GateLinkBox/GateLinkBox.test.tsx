import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { GateLinkBox } from '.';

describe('<GateLinkBox /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <GateLinkBox />
            </MemoryRouter>
        );
        const $el = screen.getByRole('link');
        expect($el).toBeInTheDocument();
    });
});
