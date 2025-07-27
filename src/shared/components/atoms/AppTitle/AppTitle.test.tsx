import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react';
import { AppTitle } from '.';

describe('<AppTitle /> component', () => {
    it('renders correctly', async () => {
        const title = faker.word.noun();
        const $heading = document.createElement('h1');
        $heading.id = 'app-title';
        document.body.prepend($heading);
        render(
            <div>
                <AppTitle title={title} />
            </div>
        );
        expect($heading).toHaveTextContent(title);
    });
});
