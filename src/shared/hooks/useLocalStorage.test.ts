import { faker } from '@faker-js/faker';
import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage hook', () => {
    it("renders with hook's returns correctly", () => {
        const keyName = faker.word.noun();
        const defaultValue = faker.word.noun();
        const { result } = renderHook(() => {
            return useLocalStorage(keyName, defaultValue);
        });
        const [storedValue, setValue] = result.current;
        expect(storedValue).toBe(defaultValue);
        expect(typeof setValue).toBe('function');
    });
    it('renders changing the storedValue', () => {
        const keyName = faker.word.noun();
        const defaultValue = faker.word.noun();
        const { result, rerender: rerenderHook } = renderHook(() => {
            return useLocalStorage(keyName, defaultValue);
        });
        let [storedValue] = result.current;
        const newStoredValue = faker.word.noun();
        act(() => {
            result.current[1](newStoredValue);
        });
        rerenderHook();
        [storedValue] = result.current;
        expect(storedValue).not.toBe(defaultValue);
        expect(storedValue).toBe(newStoredValue);
    });
    it('renders with data already stored on window.localStorage', () => {
        const keyName = faker.word.noun();
        const valueStored = JSON.stringify({ name: faker.word.noun() });
        localStorage.setItem(keyName, valueStored);
        const { result } = renderHook(() => {
            return useLocalStorage(keyName, null);
        });
        expect(result.current[0]).not.toBeNull();
        expect(result.current[0]).toStrictEqual(JSON.parse(valueStored));
    });
});
