import { InputRefContext } from '@/shared/contexts/InputRefContext';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

interface InputRefProviderProps extends PropsWithChildren {
    inputRef: ComponentPropsWithRef<typeof InputRefContext.Provider>['value'];
}

export const InputRefProvider = ({
    inputRef,
    children,
}: InputRefProviderProps) => (
    <InputRefContext value={inputRef}>{children}</InputRefContext>
);
