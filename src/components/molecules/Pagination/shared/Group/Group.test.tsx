import { render, screen } from '@testing-library/react';
import { Group } from '.';

describe('<Group /> component', () => {
    it('renders correctly', () => {
        const onChangeGroup = vi.fn();
        render(
            <Group selected={2} valueGroup={1} onChangeGroup={onChangeGroup} />
        );
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
