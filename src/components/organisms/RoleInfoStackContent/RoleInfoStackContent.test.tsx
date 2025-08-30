import { render, screen } from '@testing-library/react';
import { RoleInfoStackContent } from '.';

describe('<RoleInfoStackContent /> component', () => {
    it('renders correctly', () => {
        render(
            <div data-testid="box">
                <RoleInfoStackContent />
            </div>
        );
        const $el = screen.getByTestId('box');
        expect($el).toBeInTheDocument();
    });
});
