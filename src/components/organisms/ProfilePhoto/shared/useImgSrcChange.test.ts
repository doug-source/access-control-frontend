import { faker } from '@faker-js/faker';
import { renderHook, waitFor } from '@testing-library/react';
import { useImgSrcChange } from './useImgSrcChange';

describe('useImgSrcChange hook', () => {
    it('runs when url is defined correctly', () => {
        const url = faker.system.commonFileName('jpeg');
        const initialProps = {
            url,
            photoFile: null,
            onClear: vi.fn(),
        };
        const { result } = renderHook(
            ({ url, photoFile, onClear }) => {
                return useImgSrcChange(url, photoFile, onClear);
            },
            { initialProps }
        );
        expect(result.current).toHaveLength(2);
        expect(result.current[0]).toBe(
            `http://localhost:8000/storage/app/${url}`
        );
        expect(typeof result.current[1]).toBe('function');
        expect(initialProps.onClear).toHaveBeenCalled();
    });
    it('runs when url is null correctly', () => {
        const initialProps = {
            url: null,
            photoFile: null,
            onClear: vi.fn(),
        };
        const { result } = renderHook(
            ({ url, photoFile, onClear }) => {
                return useImgSrcChange(url, photoFile, onClear);
            },
            { initialProps }
        );
        expect(result.current).toHaveLength(2);
        expect(result.current[0]).toBeNull();
        expect(typeof result.current[1]).toBe('function');
        expect(initialProps.onClear).toHaveBeenCalled();
    });
    it('runs when photoFile is not null correctly', async () => {
        const mimetype = 'jpeg';
        const file = new File(
            ['whatever'],
            faker.system.commonFileName(mimetype),
            {
                type: mimetype,
            }
        );
        const initialProps = {
            url: faker.system.commonFileName('jpeg'),
            photoFile: file,
            onClear: vi.fn(),
        };
        const { result, rerender } = renderHook(
            ({ url, photoFile, onClear }) => {
                return useImgSrcChange(url, photoFile, onClear);
            },
            { initialProps }
        );
        rerender(initialProps);
        await waitFor(() => {
            expect(result.current[0]).toBeNull();
        });
    });
});
