import { type State } from '@/shared/types/Reducers/Standard/State';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { FormSimpleContainer } from '.';

describe('<FormSimpleContainer /> component', () => {
    it('renders correctly', () => {
        const state: State = { requestStatus: { statusCode: -1 } };
        const disabledBtn = false;
        const submitHandler = vi.fn();
        render(
            <FormSimpleContainer
                state={state}
                disabledBtn={disabledBtn}
                submitBtnText={faker.word.noun()}
                submitHandler={submitHandler}
                data-testid="container"
            >
                content
            </FormSimpleContainer>
        );
        const $el = screen.getByTestId('container');
        expect($el).toBeInTheDocument();
    });
});
