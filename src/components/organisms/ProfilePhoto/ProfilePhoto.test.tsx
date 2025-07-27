import { render, screen } from '@testing-library/react';
import { ProfilePhoto } from '.';

describe('<ProfilePhoto /> component', () => {
    it('renders correctly', () => {
        render(
            <ProfilePhoto
                url={null}
                fallback={<div>Fallback</div>}
                data-testid="profile-key"
            />
        );
        const box = screen.getByTestId('profile-key');
        expect(box).toBeInTheDocument();
    });
});
