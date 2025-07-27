import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Box } from '.';

describe('<Box /> component', () => {
    it('renders correctly', () => {
        render(
            <Box>
                <li>{faker.word.noun()}</li>
            </Box>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
