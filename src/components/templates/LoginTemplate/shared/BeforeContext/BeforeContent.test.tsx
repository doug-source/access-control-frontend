import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { BeforeContent } from '.';

describe('<BeforeContent /> component', () => {
    it('renders correctly', () => {
        render(
            <BeforeContent
                providerLink={faker.internet.url()}
                data-testid="key"
            />
        );
        expect(screen.getByTestId('key')).toBeInTheDocument();
    });
});
