import { renderHook } from '@testing-library/react';
import { type MockInstance } from 'vitest';
import * as LocalLocationHook from './useLocalLocation';
import { useOwnerInputRefs } from './useOwnerInputRefs';

let LocalLocationSpy: MockInstance<() => { pathname: string }>;

describe('useOwnerInputRefs hook', () => {
    beforeAll(() => {
        LocalLocationSpy = vi.spyOn(LocalLocationHook, 'useLocalLocation');
    });
    afterAll(() => {
        LocalLocationSpy.mockRestore();
    });
    beforeEach(() => {
        LocalLocationSpy.mockReset();
    });
    it('renders with pathname no attach at the pathname end correctly', () => {
        LocalLocationSpy.mockReturnValue({ pathname: '/users' });
        const { result } = renderHook(() => {
            return useOwnerInputRefs();
        });
        expect(result.current[0].current).toBeNull();
        expect(result.current[1].current).toStrictEqual({
            name: 'owner',
            value: 'yes',
        });
    });
    it('renders with pathname with attach at the pathname end correctly', () => {
        LocalLocationSpy.mockReturnValue({ pathname: '/users/attach' });
        const { result } = renderHook(() => {
            return useOwnerInputRefs();
        });
        expect(result.current[0].current).toBeNull();
        expect(result.current[1].current).toStrictEqual({
            name: 'owner',
            value: 'no',
        });
    });
});
