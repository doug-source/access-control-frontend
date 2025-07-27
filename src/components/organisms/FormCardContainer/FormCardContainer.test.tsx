import { type State } from '@/shared/types/Reducers/Standard/State';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { FormCardContainer } from '.';

describe('<FormCardContainer /> component', () => {
    it('renders correctly', () => {
        const state: State = { requestStatus: { statusCode: -1 } };
        const submitHandler = vi.fn();
        const disabledBtn = false;
        render(
            <FormCardContainer
                state={state}
                heading={faker.word.noun()}
                submitBtnText={faker.word.noun()}
                submitHandler={submitHandler}
                disabledBtn={disabledBtn}
                data-testid="container"
            />
        );
        const $el = screen.getByTestId('container');
        expect($el).toBeInTheDocument();
    });
});
