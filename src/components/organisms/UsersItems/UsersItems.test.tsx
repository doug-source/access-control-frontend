import { type UserIndex } from '@/shared/types/Models/User';
import { render, screen, within } from '@testing-library/react';
import { UsersItems } from '.';

const Item = ({ user }: { user: UserIndex }) => <>{user.id}</>;

describe('<UsersItems /> component', () => {
    it('renders correctly', async () => {
        const items: UserIndex[] = [];
        render(
            <ul>
                <UsersItems items={items} item={Item} />
            </ul>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
        expect($el.children.length).toBe(1);
        const $item = await within($el).findByRole('listitem');
        expect($item).toHaveTextContent('Lista vazia');
    });
});
