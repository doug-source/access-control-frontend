import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmailInputFilterBlock } from '.';

describe('<EmailInputFilterBlock /> component', () => {
    it('renders correctly', () => {
        render(
            <EmailInputFilterBlock
                subject={faker.word.noun()}
                data-testid="block"
                navigation="/abilities"
            />
        );
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
    it('renders triggering onChange correctly', async () => {
        const callbackFn = vi.fn();
        render(
            <EmailInputFilterBlock
                subject={faker.word.noun()}
                data-testid="block"
                navigation="/abilities"
            />
        );
        const $button = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click($button);

        expect(callbackFn).toHaveBeenCalled();
    });
});
