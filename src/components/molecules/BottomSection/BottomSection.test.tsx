import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { BottomSection } from '.';

describe('<BottomSection /> component', () => {
    it('renders correctly', () => {
        const label = faker.word.noun();
        render(<BottomSection label={label}>content</BottomSection>);
        const $bottom = screen.getByText('content');
        expect($bottom).toBeInTheDocument();
        const $label = screen.getByText(label);
        expect($label).toBeInTheDocument();
    });
});
