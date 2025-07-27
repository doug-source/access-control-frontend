import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Header } from '.';

describe('<Header /> component', () => {
    test('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Header />
            </MemoryRouter>
        );
        const $el = screen.getByRole('banner');
        expect($el).toBeInTheDocument();
    });
});
