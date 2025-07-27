import { faker } from '@faker-js/faker';
import { renderHook, waitFor } from '@testing-library/react';
import { usePhotoFileChange } from './usePhotoFileChange';

describe('usePhotoFileChange hook', () => {
    it('runs calling onChange correctly', async () => {
        const mimetype = 'jpeg';
        const file = new File(
            ['whatever'],
            faker.system.commonFileName(mimetype),
            {
                type: mimetype,
            }
        );
        const initialProps = {
            photoFile: file,
            onChange: vi.fn(),
        };
        renderHook(
            ({ photoFile, onChange }) => {
                usePhotoFileChange(photoFile, onChange);
            },
            { initialProps }
        );
        await waitFor(() => {
            expect(initialProps.onChange).toHaveBeenCalled();
        });
    });
    it('runs not calling onChange correctly', () => {
        const initialProps = {
            photoFile: null,
            onChange: vi.fn(),
        };
        renderHook(
            ({ photoFile, onChange }) => {
                usePhotoFileChange(photoFile, onChange);
            },
            { initialProps }
        );
        expect(initialProps.onChange).not.toHaveBeenCalled();
    });
});
