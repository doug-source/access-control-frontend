import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { faker } from '@faker-js/faker';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { BackPhotoBtn } from '.';

const runRefHook = () => {
    return renderHook(() => {
        return useRef<HTMLInputElement | null>(null);
    });
};

describe('<BackPhotoBtn /> component', () => {
    it('renders showing correctly', () => {
        const {
            result: { current: inputRef },
        } = runRefHook();
        render(<BackPhotoBtn show photoInputRef={inputRef} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    it('renders hidding correctly', () => {
        const {
            result: { current: inputRef },
        } = runRefHook();
        render(<BackPhotoBtn show={false} photoInputRef={inputRef} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
    it('renders clicking on the button correctly', async () => {
        const dispatch = vi.fn();
        const { result, rerender } = runRefHook();
        const input = {
            value: faker.word.noun(),
        } as unknown as HTMLInputElement;
        result.current.current = input;
        rerender();

        render(
            <DispatchProvider dispatch={dispatch}>
                <BackPhotoBtn show photoInputRef={result.current} />
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
