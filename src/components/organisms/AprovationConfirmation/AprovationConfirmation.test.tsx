import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { IdToApproveAction } from '@/shared/types/Reducers/Custom/ApprovementAction';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AprovationConfirmation } from '.';

describe('<AprovationConfirmation /> component', () => {
    it('renders correctly', () => {
        const onPositive = vi.fn();
        render(
            <AprovationConfirmation
                action={faker.word.noun()}
                label={faker.word.noun()}
                show
                onPositive={onPositive}
            />
        );
        const $el = screen.getByRole('heading', { level: 2 });
        expect($el).toBeInTheDocument();
    });
    it('renders clicking on "Sim" button correctly', async () => {
        const onPositive = vi.fn();
        render(
            <AprovationConfirmation
                action={faker.word.noun()}
                label={faker.word.noun()}
                show
                onPositive={onPositive}
            />
        );
        const $button = screen.getByRole('button', { name: 'Sim' });
        const user = userEvent.setup();
        await user.click($button);
        expect(onPositive).toHaveBeenCalled();
    });
    it('renders loading after click on "Não" button correctly', async () => {
        const callbackDispatchFn = vi.fn();
        const dispatch = (action: IdToApproveAction<null>) => {
            callbackDispatchFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <AprovationConfirmation
                    action={faker.word.noun()}
                    label={faker.word.noun()}
                    show
                    onPositive={vi.fn()}
                />
            </DispatchProvider>
        );
        const $btn = screen.getByRole('button', { name: 'Não' });
        const user = userEvent.setup();
        await user.click($btn);

        expect(callbackDispatchFn).toHaveBeenCalled();
    });
    it('renders clicking on close button correctly', async () => {
        const callbackDispatchFn = vi.fn();
        const dispatch = (action: IdToApproveAction<null>) => {
            callbackDispatchFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <AprovationConfirmation
                    action={faker.word.noun()}
                    label={faker.word.noun()}
                    show
                    onPositive={vi.fn()}
                />
            </DispatchProvider>
        );
        const $btn = screen.getByRole('button', {
            name: /Botão para fechar a caixa de diálogo/,
        });
        const user = userEvent.setup();
        await user.click($btn);
        expect(callbackDispatchFn).toHaveBeenCalled();
    });
});
