import { faker } from '@faker-js/faker';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { PhotoFile } from '.';

const runRefHook = () => {
    return renderHook(() => {
        return useRef<HTMLInputElement | null>(null);
    });
};

describe('PhotoFile component', () => {
    it("renders component's content correctly", () => {
        const setFile = vi.fn();
        const {
            result: { current: inputRef },
        } = runRefHook();
        render(<PhotoFile inputRef={inputRef} setFile={setFile} />);
        const box = screen.getByText('Clique na caixa para upload');
        expect(box).toBeInTheDocument();
        const input = screen.getByLabelText('Input da foto do usuário');
        expect(input).toBeInTheDocument();
    });
    it('renders calling onCange handler', async () => {
        const {
            result: { current: inputRef },
        } = runRefHook();
        const setFile = vi.fn();
        render(<PhotoFile inputRef={inputRef} setFile={setFile} />);
        const user = userEvent.setup();
        const mimetype = 'image/png';
        const filename = faker.system.commonFileName(mimetype);
        const fileInput = screen.getByLabelText<HTMLInputElement>(
            'Input da foto do usuário'
        );
        const file = new File([faker.word.noun()], filename, {
            type: mimetype,
        });
        await user.upload(fileInput, file);

        expect(fileInput.files).toHaveLength(1);
        expect(fileInput.files?.[0]).toStrictEqual(file);
        expect(fileInput.files?.item(0)).toStrictEqual(file);
    });
});
