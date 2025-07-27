import { faker } from '@faker-js/faker';
import { render, renderHook, screen } from '@testing-library/react';
import { RefObject, useRef } from 'react';
import { MockInstance } from 'vitest';
import { PhotoPreview } from '.';
import styles from './PhotoPreview.module.scss';
import * as DepsHooks from './shared/useDeps';

const runRefHook = () => {
    return renderHook(() => {
        return useRef<HTMLImageElement | null>(null);
    });
};

let depsSpy: MockInstance<
    () => {
        loaded: boolean;
        onLoad: () => void;
        imgRef: RefObject<HTMLImageElement | null>;
    }
>;

describe('<PhotoPreview /> component', () => {
    beforeAll(() => {
        depsSpy = vi.spyOn(DepsHooks, 'useDeps');
    });
    afterAll(() => {
        depsSpy.mockRestore();
    });
    afterEach(() => {
        depsSpy.mockReset();
    });
    it('renders correctly', () => {
        render(
            <PhotoPreview
                src={faker.system.commonFileName('jpeg')}
                fallback={<div>Fallback</div>}
            />
        );
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
    });
    it('renders when src property is null correctly', () => {
        render(<PhotoPreview src={null} fallback={<div>Fallback</div>} />);
        const fallback = screen.getByText('Fallback');
        expect(fallback).toBeInTheDocument();
    });
    it('renders when loaded is false correctly', () => {
        const {
            result: { current: imgRef },
        } = runRefHook();
        depsSpy.mockReturnValue({ loaded: false, onLoad: vi.fn(), imgRef });
        render(
            <PhotoPreview
                src={faker.system.commonFileName('jpeg')}
                fallback={<div>Fallback</div>}
            />
        );
        const photo = screen.getByAltText('photo do usuário');
        expect(photo).toHaveClass(styles.photoLoading);
    });
});
