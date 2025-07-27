import { render, screen } from '@testing-library/react';
import { Input } from '.';
import styles from './Input.module.scss';

describe('<Input /> component', () => {
    it('renders correctly', () => {
        render(<Input />);
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
    it('renders no blurred property correctly', () => {
        render(<Input />);
        const $el = screen.getByRole('textbox');
        expect($el).toHaveClass(styles.fieldInput);
        expect($el).not.toHaveClass(styles.blurred);
    });
    it('renders with blurred property correctly', () => {
        render(<Input blurred />);
        const $el = screen.getByRole('textbox');
        expect($el).toHaveClass(styles.fieldInput);
        expect($el).toHaveClass(styles.blurred);
    });
});
