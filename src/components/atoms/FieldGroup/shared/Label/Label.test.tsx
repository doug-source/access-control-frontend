import { render, screen } from '@testing-library/react';
import { Label } from '.';
import styles from './Label.module.scss';

describe('<Label /> component', () => {
    it('renders correctly', () => {
        render(<Label>content</Label>);
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.fieldLabel);
    });
});
