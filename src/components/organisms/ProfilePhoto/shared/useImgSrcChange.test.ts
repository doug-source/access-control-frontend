import { faker } from '@faker-js/faker';
import { renderHook, waitFor } from '@testing-library/react';
import { useImgSrcChange } from './useImgSrcChange';

describe('useImgSrcChange hook', () => {
    it('runs when url is defined correctly', () => {
        const url = faker.system.commonFileName('jpeg');
        const initialProps = {
            url,
            chosenFile: false,
        };
        const { result } = renderHook(
            ({ url, chosenFile }) => {
                return useImgSrcChange(url, chosenFile);
            },
            { initialProps }
        );
        expect(result.current).toHaveLength(2);
        expect(result.current[0]).toBe(
            `http://localhost:8000/storage/app/${url}`
        );
        expect(typeof result.current[1]).toBe('function');
    });
    it('runs when url is null correctly', () => {
        const initialProps = {
            url: null,
            chosenFile: false,
        };
        const { result } = renderHook(
            ({ url, chosenFile }) => {
                return useImgSrcChange(url, chosenFile);
            },
            { initialProps }
        );
        expect(result.current).toHaveLength(2);
        expect(result.current[0]).toBeNull();
        expect(typeof result.current[1]).toBe('function');
    });
    it('runs when photoFile is not null correctly', async () => {
        // const mimetype = 'jpeg';
        // const file = new File(
        //     ['whatever'],
        //     faker.system.commonFileName(mimetype),
        //     {
        //         type: mimetype,
        //     }
        // );
        const initialProps = {
            url: faker.system.commonFileName('jpeg'),
            chosenFile: false,
        };
        const { result, rerender } = renderHook(
            ({ url, chosenFile }) => {
                return useImgSrcChange(url, chosenFile);
            },
            { initialProps }
        );
        rerender(initialProps);
        await waitFor(() => {
            expect(result.current[0]).toBeNull();
        });
    });
});
