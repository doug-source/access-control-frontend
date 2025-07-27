import { faker } from '@faker-js/faker';
import { render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Dialog } from '.';

const runHook = () => {
    return renderHook(() => {
        return useState(true);
    });
};

describe('<Dialog /> component', () => {
    it('renders showing correctly', () => {
        const onClose = vi.fn();
        const ariaLabel = faker.word.noun();
        const heading = faker.word.noun();
        render(
            <Dialog
                show
                aria-label={ariaLabel}
                heading={heading}
                onClose={onClose}
                data-testid="dialog-item"
            >
                content
            </Dialog>
        );
        const $el = screen.getByTestId('dialog-item');
        expect($el).toBeInTheDocument();
    });
    it('renders hidding correctly', () => {
        const onClose = vi.fn();
        const ariaLabel = faker.word.noun();
        const heading = faker.word.noun();
        render(
            <Dialog
                show={false}
                aria-label={ariaLabel}
                heading={heading}
                onClose={onClose}
                data-testid="dialog"
            >
                content
            </Dialog>
        );
        const $el = screen.queryByTestId('dialog-item');
        expect($el).not.toBeInTheDocument();
    });
    it('renders closing correctly', async () => {
        const { result: resultHook, rerender: rerenderHook } = runHook();
        let {
            current: [show],
        } = resultHook;
        const {
            current: [, setShow],
        } = resultHook;
        const onCloseInner = vi.fn();
        const onClose = () => {
            setShow(false);
            onCloseInner();
        };
        const ariaLabel = faker.word.noun();
        const heading = faker.word.noun();
        const { rerender } = render(
            <Dialog
                show={show}
                aria-label={ariaLabel}
                heading={heading}
                onClose={onClose}
                data-testid="dialog-item"
            >
                content
            </Dialog>
        );
        let $el: HTMLElement | null = screen.getByTestId('dialog-item');
        expect($el).toBeInTheDocument();
        const user = userEvent.setup();
        await user.click(within($el).getByRole('button'));
        rerenderHook();
        ({
            current: [show],
        } = resultHook);
        rerender(
            <Dialog
                show={show}
                aria-label={ariaLabel}
                heading={heading}
                onClose={onClose}
                data-testid="dialog"
            >
                content
            </Dialog>
        );
        $el = screen.queryByTestId('dialog-item');
        expect($el).not.toBeInTheDocument();
    });
});
