import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { PaginationPurpose } from '.';

describe('<PaginationPurpose /> component', () => {
    it('renders with show prop with true value correctly', () => {
        render(
            <PaginationPurpose
                show
                label={faker.word.noun()}
                value={faker.word.noun()}
            />
        );
        const $el = screen.getByRole('article');
        expect($el).toBeInTheDocument();
    });
    it('renders with show prop with false value correctly', () => {
        render(
            <PaginationPurpose
                show={false}
                label={faker.word.noun()}
                value={faker.word.noun()}
            />
        );
        const $el = screen.queryByRole('article');
        expect($el).not.toBeInTheDocument();
    });
});
