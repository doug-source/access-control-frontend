import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { IdToRemovedAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RemotionConfirmation } from '.';

describe('<RemotionConfirmation /> component', () => {
    it('renders correctly', () => {
        const fnAsync = vi.fn();
        render(
            <RemotionConfirmation
                show
                action={faker.word.noun()}
                label={faker.word.noun()}
                onPositive={fnAsync}
            />
        );
        const $el = screen.getByText('Confirmação');
        expect($el).toBeInTheDocument();
    });
    it('renders loading after click on "Sim" button correctly', async () => {
        const callbackDispatchFn = vi.fn();
        const dispatch = (action: IdToRemovedAction<null>) => {
            callbackDispatchFn(action);
        };
        const onPositive = vi.fn();
        const fnAsync = async () => {
            onPositive();
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <RemotionConfirmation
                    show
                    action={faker.word.noun()}
                    label={faker.word.noun()}
                    onPositive={fnAsync}
                />
            </DispatchProvider>
        );
        const $btn = screen.getByRole('button', { name: 'Sim' });
        const user = userEvent.setup();
        await user.click($btn);

        expect(callbackDispatchFn).toHaveBeenCalled();
        expect(onPositive).toHaveBeenCalled();
    });
    it('renders loading after click on "Não" button correctly', async () => {
        const callbackDispatchFn = vi.fn();
        const dispatch = (action: IdToRemovedAction<null>) => {
            callbackDispatchFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <RemotionConfirmation
                    show
                    action={faker.word.noun()}
                    label={faker.word.noun()}
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
        const dispatch = (action: IdToRemovedAction<null>) => {
            callbackDispatchFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <RemotionConfirmation
                    show
                    action={faker.word.noun()}
                    label={faker.word.noun()}
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
