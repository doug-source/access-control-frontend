import { render, screen } from '@testing-library/react';
import { DotsLoader } from '.';

describe('<DotsLoader /> component', () => {
    it('renders correctly', () => {
        render(<DotsLoader data-testid="key" />);
        expect(screen.getByTestId('key')).toBeInTheDocument();
    });
});
