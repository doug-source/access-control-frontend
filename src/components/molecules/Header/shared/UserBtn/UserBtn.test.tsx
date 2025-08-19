import { screen } from '@testing-library/react';

describe('<UserBtn /> component', () => {
    it('renders correctly', () => {
        const $button = screen.getByRole('button', {
            name: /Botão para visualizar detalhes da pessoa autenticada/,
        });
        expect($button).toBeInTheDocument();
    });
});
