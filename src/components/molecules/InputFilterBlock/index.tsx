import { InputFilter } from '@/components/atoms/InputFilter';
import { Label } from '@/components/atoms/Label';
import { useInputRef } from '@/shared/hooks/useInputRef';
import { type ComponentPropsWithRef, useId } from 'react';

type RemainProps = ComponentPropsWithRef<typeof InputFilter.Box>;

interface InputFilterBlockProps extends RemainProps {
    className?: string;
    label: string;
    placeholder: string;
    btnText: string;
    onChange(): void;
    nameInput?: string;
}

export const InputFilterBlock = ({
    className,
    label,
    placeholder,
    btnText,
    onChange,
    nameInput,
    ...remain
}: InputFilterBlockProps) => {
    const inputID = useId();
    const inputRef = useInputRef();
    return (
        <InputFilter.Box {...remain} className={className}>
            <Label htmlFor={inputID}>{label}</Label>
            <InputFilter.Input
                placeholder={placeholder}
                id={inputID}
                ref={inputRef}
                name={nameInput}
            />
            <InputFilter.Btn
                onClick={() => {
                    const { current: input } = inputRef;
                    if (input) {
                        onChange();
                    }
                }}
            >
                {btnText}
            </InputFilter.Btn>
        </InputFilter.Box>
    );
};
