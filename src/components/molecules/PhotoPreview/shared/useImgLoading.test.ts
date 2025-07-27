import { renderHook } from '@testing-library/react';
import { useImgLoading } from './useImgLoading';

describe('useImgLoading hook', () => {
    it('runs correctly', () => {
        const { result } = renderHook(() => {
            return useImgLoading();
        });
        expect(result.current.loaded).toBe(false);
        expect(typeof result.current.onLoad).toBe('function');
        expect(result.current.imgRef).toStrictEqual({ current: null });
    });
});
