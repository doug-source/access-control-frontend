import { groups } from '@/shared/utils/pagination';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Groups } from '.';

describe('<Groups /> component', () => {
    it('renders correctly', () => {
        const onChangeGroup = vi.fn();
        render(
            <Groups
                data-testid="groups"
                selected={1}
                values={groups}
                onChangeGroup={onChangeGroup}
            />
        );
        const $el = screen.getByTestId('groups');
        expect($el).toBeInTheDocument();
    });
    it('renders clicking on other group correctly', async () => {
        const onChangeGroup = vi.fn();
        render(
            <Groups
                selected={3}
                values={groups}
                onChangeGroup={onChangeGroup}
            />
        );
        const $btn = screen.getByRole('button', {
            name: new RegExp(
                `Botão para definir o grupo atual de paginação como ${groups[1]}`
            ),
        });
        expect($btn).toBeInTheDocument();
        const user = userEvent.setup();
        await user.click($btn);
        expect(onChangeGroup).toHaveBeenCalled();
    });
});
