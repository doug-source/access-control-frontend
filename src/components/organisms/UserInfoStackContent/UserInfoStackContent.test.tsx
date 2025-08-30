import { render, screen } from '@testing-library/react';
import { UserInfoStackContent } from '.';

describe('<UserInfoStackContent /> component', () => {
    it('renders correctly', () => {
        render(
            <div data-testid="box">
                <UserInfoStackContent />
            </div>
        );
        const $el = screen.getByTestId('box');
        expect($el).toBeInTheDocument();
    });
});
