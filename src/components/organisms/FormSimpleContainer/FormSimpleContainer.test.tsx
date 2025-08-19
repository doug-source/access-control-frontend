import { type State } from '@/shared/types/States';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { FormSimpleContainer } from '.';

describe('<FormSimpleContainer /> component', () => {
    it('renders correctly', () => {
        const state: State = { requestStatus: { statusCode: -1 } };
        const formAction = vi.fn();
        render(
            <FormSimpleContainer
                state={state}
                submitBtnText={faker.word.noun()}
                formAction={formAction}
                pending={false}
                data-testid="container"
            >
                content
            </FormSimpleContainer>
        );
        const $el = screen.getByTestId('container');
        expect($el).toBeInTheDocument();
    });
});
