import { render, screen } from '@testing-library/react';
import { UserInfoStackContent } from '.';

describe('<UserInfoStackContent /> component', () => {
    it('renders correctly', () => {
        render(
            <div data-testid="box">
                <UserInfoStackContent user={null} />
            </div>
        );
        const $el = screen.getByTestId('box');
        expect($el).toBeInTheDocument();
    });
});
