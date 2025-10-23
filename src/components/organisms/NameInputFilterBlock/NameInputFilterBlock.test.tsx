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
                data-testid="f-block"
                navigation="/abilities"
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
                data-testid="f-block"
                navigation="/abilities"
            />
        );
        const $button = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click($button);

        expect(callbackFn).toHaveBeenCalled();
    });
});
