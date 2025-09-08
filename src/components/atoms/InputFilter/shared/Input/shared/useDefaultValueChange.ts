import { ComponentPropsWithRef, useEffect, useState } from 'react';

type DefaultValue = ComponentPropsWithRef<'input'>['defaultValue'];

export const useDefaultValueChange = (defaultValue: DefaultValue) => {
    const [value, setValue] = useState<typeof defaultValue>('');
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    return [value, setValue] as const;
};
