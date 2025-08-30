import { render, screen } from '@testing-library/react';
import { RegisterRequestInfoStackContent } from '.';

describe('<RegisterRequestInfoStackContent /> component', () => {
    it('renders with phone correctly', () => {
        render(
            <div data-testid="block">
                <RegisterRequestInfoStackContent />
            </div>
        );
        const $el = screen.getByTestId('block');
        expect($el).toBeInTheDocument();
        const $phoneNullable = screen.queryByText('-');
        expect($phoneNullable).not.toBeInTheDocument();
    });
    it('renders no phone correctly', () => {
        render(
            <div data-testid="block">
                <RegisterRequestInfoStackContent />
            </div>
        );
        const $phoneNullable = screen.getByText('-');
        expect($phoneNullable).toBeInTheDocument();
    });
});
