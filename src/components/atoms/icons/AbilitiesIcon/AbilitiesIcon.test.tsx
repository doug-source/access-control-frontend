import { render, screen } from '@testing-library/react';
import { AbilitiesIcon } from '.';

describe('<AbilitiesIcon /> component', () => {
    it('renders correctly', () => {
        render(<AbilitiesIcon data-testid="icon" />);

        const $el = screen.getByTestId('icon');
        expect($el).toBeInTheDocument();
    });
    it('renders no icon', () => {
        render(<AbilitiesIcon data-testid="icon" show={false} />);

        const $el = screen.queryByTestId('icon');
        expect($el).not.toBeInTheDocument();
    });
});
