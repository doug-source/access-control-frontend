import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Controls } from '.';

describe('<Controls /> component', () => {
    it('renders correctly', () => {
        const fn = vi.fn();
        render(
            <Controls
                data-testid="controls"
                page={1}
                lastPage={1}
                onChangePage={fn}
            />
        );
        const $el = screen.getByTestId('controls');
        expect($el).toBeInTheDocument();
    });
    it('renders decrease the page correctly', async () => {
        const onChangePage = vi.fn();
        render(
            <Controls
                data-testid="controls"
                page={3}
                lastPage={5}
                onChangePage={onChangePage}
            />
        );
        expect(onChangePage).not.toHaveBeenCalled();
        const [$leftBtn] = screen.getAllByRole('button');
        expect($leftBtn).toBeInTheDocument();
        const user = userEvent.setup();
        await user.click($leftBtn);
        expect(onChangePage).toHaveBeenCalled();
    });
    it('renders increase the page correctly', async () => {
        const onChangePage = vi.fn();
        render(
            <Controls
                data-testid="controls"
                page={3}
                lastPage={5}
                onChangePage={onChangePage}
            />
        );
        expect(onChangePage).not.toHaveBeenCalled();
        const [, $rightBtn] = screen.getAllByRole('button');
        expect($rightBtn).toBeInTheDocument();
        const user = userEvent.setup();
        await user.click($rightBtn);
        expect(onChangePage).toHaveBeenCalled();
    });
});
