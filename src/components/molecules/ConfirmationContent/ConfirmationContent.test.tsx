import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationContent } from '.';

describe('<ConfirmationContent /> component', () => {
    it('renders correctly', () => {
        const setLoading = vi.fn();
        const onPositive = vi.fn();
        const onNegative = vi.fn();
        render(
            <div>
                <ConfirmationContent
                    action={faker.word.noun()}
                    setLoading={setLoading}
                    onPositive={onPositive}
                    onNegative={onNegative}
                />
            </div>
        );
        const $heading = screen.getByRole('heading', { level: 3 });
        expect($heading).toBeInTheDocument();
        screen.getAllByRole('button').forEach(($btn) => {
            expect($btn.parentElement).not.toEqual($heading);
            expect($btn).toBeInTheDocument();
        });
    });
    it('renders correctly', async () => {
        const setLoading = vi.fn();
        const onPositive = vi.fn();
        const onPositiveAsync = async () => onPositive();
        const onNegative = vi.fn();
        render(
            <div>
                <ConfirmationContent
                    action={faker.word.noun()}
                    setLoading={setLoading}
                    onPositive={onPositiveAsync}
                    onNegative={onNegative}
                />
            </div>
        );
        const user = userEvent.setup();
        const $yesButton = screen.getByRole('button', { name: 'Sim' });
        await user.click($yesButton);
        expect(setLoading).toHaveBeenCalled();
        expect(onPositive).toHaveBeenCalled();
    });
});
