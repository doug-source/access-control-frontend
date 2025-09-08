import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputFilterBlock } from '.';

describe('<InputFilterBlock /> component', () => {
    it('renders correctly', () => {
        const onChange = vi.fn();
        render(
            <InputFilterBlock
                label="Label"
                placeholder="Placeholder"
                btnText="btn"
                onChange={onChange}
                data-testid="block"
            />
        );
        const $el = screen.getByTestId('block');
        expect($el).toBeInTheDocument();
    });
    it("allows the button clicking with input's reference not nullable", async () => {
        const onChange = vi.fn();
        render(
            <InputFilterBlock
                label="Label"
                placeholder="Placeholder"
                btnText="btn"
                onChange={onChange}
                data-testid="block"
            />
        );
        const $input = screen.getByTestId('block');
        expect($input).toBeInTheDocument();
        expect(onChange).not.toHaveBeenCalled();
        const $btn = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click($btn);
        expect(onChange).toHaveBeenCalled();
    });
});
