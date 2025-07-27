import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { AttachConfirmContent } from '.';

describe('<AttachConfirmContent /> component', () => {
    it('renders correctly', () => {
        const onFirstClick = vi.fn();
        const onSecondClick = vi.fn();
        render(
            <AttachConfirmContent
                firstLabel={faker.string.alpha()}
                secondLabel={faker.string.alpha()}
                onFirstClick={onFirstClick}
                onSecondClick={onSecondClick}
            />
        );
        const $heading = screen.getByRole('heading', { level: 3 });
        expect($heading).toBeInTheDocument();
        screen.getAllByRole('button').forEach(($btn) => {
            expect($btn.parentElement).not.toEqual($heading);
            expect($btn).toBeInTheDocument();
        });
    });
});
