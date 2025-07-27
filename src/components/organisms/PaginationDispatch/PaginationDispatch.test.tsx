import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import {
    type ChangeGroupAction,
    type ChangePageAction,
} from '@/shared/types/Reducers/Custom/PaginationAction';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaginationDispatch } from '.';

describe('<PaginationDispatch /> component', () => {
    it('renders correctly', () => {
        render(
            <PaginationDispatch
                state={{ page: 1, group: 1, lastPage: 1, total: 1 }}
                data-testid="pag-dispatch"
            />
        );
        const $el = screen.getByTestId('pag-dispatch');
        expect($el).toBeInTheDocument();
    });
    it('renders clicking on page change button correctly', async () => {
        const callbackFn = vi.fn();
        const dispatch = (action: ChangeGroupAction | ChangePageAction) => {
            callbackFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <PaginationDispatch
                    state={{ page: 2, group: 3, lastPage: 5, total: 15 }}
                />
            </DispatchProvider>
        );

        const $button = screen.getByRole('button', {
            name: 'Botão para diminuir a paginação atual.',
        });
        const user = userEvent.setup();
        await user.click($button);

        expect(callbackFn).toHaveBeenCalled();
    });
    it('renders clicking on group change button correctly', async () => {
        const callbackFn = vi.fn();
        const dispatch = (action: ChangeGroupAction | ChangePageAction) => {
            callbackFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <PaginationDispatch
                    state={{ page: 2, group: 3, lastPage: 5, total: 15 }}
                />
            </DispatchProvider>
        );
        const $button = screen.getByRole('button', {
            name: /Botão para definir o grupo atual de paginação como 3/,
        });
        const user = userEvent.setup();
        await user.click($button);
        expect(callbackFn).toHaveBeenCalled();
    });
});
