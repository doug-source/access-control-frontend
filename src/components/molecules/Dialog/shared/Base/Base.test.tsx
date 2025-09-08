import { faker } from '@faker-js/faker';
import { render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Base } from '.';

const runHook = () => {
    return renderHook(() => {
        return useState(true);
    });
};

describe('<Base /> component', () => {
    it('renders showing correctly', () => {
        const onClose = vi.fn();
        const ariaLabel = faker.word.noun();
        const heading = faker.word.noun();
        render(
            <Base
                show
                aria-label={ariaLabel}
                heading={heading}
                onClose={onClose}
                data-testid="dialog-item"
            >
                content
            </Base>
        );
        const $el = screen.getByTestId('dialog-item');
        expect($el).toBeInTheDocument();
    });
    it('renders hidding correctly', () => {
        const onClose = vi.fn();
        const ariaLabel = faker.word.noun();
        const heading = faker.word.noun();
        render(
            <Base
                show={false}
                aria-label={ariaLabel}
                heading={heading}
                onClose={onClose}
                data-testid="dialog"
            >
                content
            </Base>
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
            <Base
                show={show}
                aria-label={ariaLabel}
                heading={heading}
                onClose={onClose}
                data-testid="dialog-item"
            >
                content
            </Base>
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
            <Base
                show={show}
                aria-label={ariaLabel}
                heading={heading}
                onClose={onClose}
                data-testid="dialog"
            >
                content
            </Base>
        );
        $el = screen.queryByTestId('dialog-item');
        expect($el).not.toBeInTheDocument();
    });
});
