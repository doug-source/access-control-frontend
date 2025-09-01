import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { ChangeFilterAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import { faker } from '@faker-js/faker';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { EmailInputFilterBlock } from '.';

const runHook = () => {
    return renderHook(() => {
        return useRef<HTMLInputElement | null>(null);
    });
};

describe('<EmailInputFilterBlock /> component', () => {
    it('renders correctly', () => {
        const {
            result: { current: ref },
        } = runHook();
        render(
            <InputRefProvider inputRef={ref}>
                <EmailInputFilterBlock
                    subject={faker.word.noun()}
                    data-testid="block"
                    context="register-request"
                />
            </InputRefProvider>
        );
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
    it('renders triggering onChange correctly', async () => {
        const {
            result: { current: ref },
        } = runHook();
        const callbackFn = vi.fn();
        const dispatch = (action: ChangeFilterAction) => {
            callbackFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <InputRefProvider inputRef={ref}>
                    <EmailInputFilterBlock
                        subject={faker.word.noun()}
                        data-testid="block"
                        context="register-request"
                    />
                </InputRefProvider>
            </DispatchProvider>
        );
        const $button = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click($button);

        expect(callbackFn).toHaveBeenCalled();
    });
});
