import { useId, type ChangeEventHandler } from 'react';
import styles from './ConfirmationRow.module.scss';

interface ConfirmationRowProps {
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    description: string;
    name: string;
}

export const ConfirmationRow = ({
    checked,
    onChange,
    description,
    name,
}: ConfirmationRowProps) => {
    const id = useId();
    return (
        <li>
            <input
                type="checkbox"
                name={name}
                id={id}
                checked={checked}
                onChange={onChange}
                className={styles.checkbox}
            />
            <label htmlFor={id} className={styles.content}>
                {description}
            </label>
        </li>
    );
};
