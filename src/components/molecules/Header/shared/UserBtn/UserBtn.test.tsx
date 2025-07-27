import { render } from '@testing-library/react';
import { UserBtn } from '.';

describe('<UserBtn /> component', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<UserBtn />);
        const $button = getByRole('button', {
            name: /Botão para visualizar detalhes da pessoa autenticada/,
        });
        expect($button).toBeInTheDocument();
    });
});
