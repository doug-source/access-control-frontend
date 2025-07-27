import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { IdToDetachAction } from '@/shared/types/Reducers/Custom/DetachmentAction';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DetashmentConfirmation } from '.';

describe('<DetashmentConfirmation /> component', () => {
    it('renders correctly', () => {
        const onPositive = vi.fn();
        render(
            <DetashmentConfirmation
                action={faker.word.noun()}
                label={faker.word.noun()}
                show
                onPositive={onPositive}
            />
        );
        const $el = screen.getByRole('heading', { level: 3 });
        expect($el).toBeInTheDocument();
    });
    it('renders loading after click on "Sim" button correctly', async () => {
        const callbackDispatchFn = vi.fn();
        const dispatch = (action: IdToDetachAction<null>) => {
            callbackDispatchFn(action);
        };
        const onPositive = vi.fn();
        const fnAsync = async () => {
            onPositive();
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <DetashmentConfirmation
                    action={faker.word.noun()}
                    label={faker.word.noun()}
                    show
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
        const dispatch = (action: IdToDetachAction<null>) => {
            callbackDispatchFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <DetashmentConfirmation
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
        const dispatch = (action: IdToDetachAction<null>) => {
            callbackDispatchFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <DetashmentConfirmation
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
