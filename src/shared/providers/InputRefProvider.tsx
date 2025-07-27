import { InputRefContext } from '@/shared/contexts/InputRefContext';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

interface InputRefProviderProps {
    inputRef: ComponentPropsWithoutRef<
        typeof InputRefContext.Provider
    >['value'];
    children: ReactNode;
}

export const InputRefProvider = ({
    inputRef,
    children,
}: InputRefProviderProps) => (
    <InputRefContext.Provider value={inputRef}>
        {children}
    </InputRefContext.Provider>
);
