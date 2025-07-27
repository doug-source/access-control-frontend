import { render, screen } from '@testing-library/react';
import { AbilityInfoStackContent } from '.';

describe('<AbilityInfoStackContent /> component', () => {
    it('renders correctly', () => {
        render(
            <div data-testid="container">
                <AbilityInfoStackContent ability={null} />
            </div>
        );
        const $el = screen.getByTestId('container');
        const $children = $el.getElementsByTagName('div');
        expect($children.length).toBe(6);
    });
});
