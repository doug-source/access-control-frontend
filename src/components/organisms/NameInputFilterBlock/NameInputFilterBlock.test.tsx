import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NameInputFilterBlock } from '.';

describe('<NameInputFilterBlock /> component', () => {
    it('renders correctly', () => {
        const subject = faker.word.noun();
        render(
            <NameInputFilterBlock
                subject={subject}
                context="user"
                data-testid="f-block"
            />
        );
        const $el = screen.getByTestId('f-block');
        expect($el).toBeInTheDocument();
    });
    it('renders triggering onChange correctly', async () => {
        const callbackFn = vi.fn();
        render(
            <NameInputFilterBlock
                subject={faker.word.noun()}
                context="user"
                data-testid="f-block"
            />
        );
        const $button = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click($button);

        expect(callbackFn).toHaveBeenCalled();
    });
});
