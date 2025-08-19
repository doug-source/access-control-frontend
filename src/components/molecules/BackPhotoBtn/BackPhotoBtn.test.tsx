import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BackPhotoBtn } from '.';

describe('<BackPhotoBtn /> component', () => {
    it('renders showing correctly', () => {
        const onClick = vi.fn();
        render(<BackPhotoBtn show onClick={onClick} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    it('renders hidding correctly', () => {
        const onClick = vi.fn();
        render(<BackPhotoBtn show={false} onClick={onClick} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
    it('renders clicking on the button correctly', async () => {
        const dispatch = vi.fn();
        const onClick = vi.fn();
        const input = {
            value: faker.word.noun(),
        } as unknown as HTMLInputElement;

        render(
            <DispatchProvider dispatch={dispatch}>
                <BackPhotoBtn show onClick={onClick} />
            </DispatchProvider>
        );
        const btn = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click(btn);

        expect(dispatch).toHaveBeenCalledWith({
            type: 'photo-chosen-change',
            payload: null,
        });
        expect(input.value).toBe('');
    });
});
