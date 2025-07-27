import { useState } from 'react';

export const useLocalStorage = <T>(keyName: string, defaultValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value) as T;
            } else {
                window.localStorage.setItem(
                    keyName,
                    JSON.stringify(defaultValue)
                );
                return defaultValue;
            }
        } catch {
            return defaultValue;
        }
    });
    const setValue = <W extends T>(newValue: W) => {
        localStorage.setItem(keyName, JSON.stringify(newValue));
        setStoredValue(newValue);
    };
    return [storedValue, setValue] as const;
};
