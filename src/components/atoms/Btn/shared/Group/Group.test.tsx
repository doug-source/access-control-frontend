import { render, screen } from '@testing-library/react';
import { BtnGroup } from '.';

describe('<BtnGroup /> component', () => {
    it('renders correctly', () => {
        const fn = vi.fn();
        render(
            <BtnGroup
                firstLabel="foo"
                secondLabel="bar"
                onFirstClick={fn}
                onSecondClick={fn}
                data-testid="btn-group"
            >
                content
            </BtnGroup>
        );
        const $el = screen.getByTestId('btn-group');
        expect($el).toBeInTheDocument();
    });
});
