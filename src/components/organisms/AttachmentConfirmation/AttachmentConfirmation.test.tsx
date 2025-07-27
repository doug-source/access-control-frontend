import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { IdToAttachAction } from '@/shared/types/Reducers/Custom/AttachmentAction';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AttachmentConfirmation } from '.';

describe('<AttachmentConfirmation /> component', () => {
    it('renders correctly', () => {
        const onPositive = vi.fn();
        render(
            <AttachmentConfirmation
                action={faker.word.noun()}
                label={faker.word.noun()}
                show
                onPositive={onPositive}
            />
        );
        const $el = screen.getByRole('heading', { level: 3 });
        expect($el).toBeInTheDocument();
    });
    it('renders clicking on "Sim" button correctly', async () => {
        const onPositive = vi.fn();
        render(
            <AttachmentConfirmation
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
        const dispatch = (action: IdToAttachAction<null>) => {
            callbackDispatchFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <AttachmentConfirmation
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
        const dispatch = (action: IdToAttachAction<null>) => {
            callbackDispatchFn(action);
        };
        render(
            <DispatchProvider dispatch={dispatch}>
                <AttachmentConfirmation
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
