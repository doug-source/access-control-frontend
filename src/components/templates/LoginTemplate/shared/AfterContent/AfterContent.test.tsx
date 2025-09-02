import { render, screen } from '@testing-library/react';
import { AfterContent } from '.';

describe('<AfterContent /> component', () => {
    it('renders correctly', () => {
        render(<AfterContent data-testid="key" />);
        expect(screen.getByTestId('key')).toBeInTheDocument();
    });
});
