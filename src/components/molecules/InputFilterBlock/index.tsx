import { InputFilter } from '@/components/atoms/InputFilter';
import { Label } from '@/components/atoms/Label';
import { type ComponentPropsWithRef, useId, useRef } from 'react';

type BaseProps = Omit<
    ComponentPropsWithRef<typeof InputFilter.Box>,
    'onChange'
>;

interface InputFilterBlockProps extends BaseProps {
    className?: string;
    label: string;
    placeholder: string;
    btnText: string;
    onChange(name?: string): void;
    nameInput?: string;
    defaultValue?: ComponentPropsWithRef<
        typeof InputFilter.Input
    >['defaultValue'];
}

export const InputFilterBlock = ({
    className,
    label,
    placeholder,
    btnText,
    onChange,
    nameInput,
    defaultValue,
    ...remain
}: InputFilterBlockProps) => {
    const inputID = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    return (
        <InputFilter.Box {...remain} className={className}>
            <Label htmlFor={inputID}>{label}</Label>
            <InputFilter.Input
                placeholder={placeholder}
                id={inputID}
                ref={inputRef}
                name={nameInput}
                defaultValue={defaultValue}
                onKeyDown={(evt) => {
                    if (evt.key === 'Enter') {
                        btnRef.current?.click();
                    }
                }}
            />
            <InputFilter.Btn
                ref={btnRef}
                onClick={() => {
                    const { current: input } = inputRef;
                    if (input) {
                        onChange(input.value);
                    }
                }}
            >
                {btnText}
            </InputFilter.Btn>
        </InputFilter.Box>
    );
};
