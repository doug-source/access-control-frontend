import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { registerPermissionsInitialData } from '@/shared/utils/ReduceInitialValues';
import { render, renderHook, screen } from '@testing-library/react';
import { useRef } from 'react';
import { RegisterPermissionsTemplate } from '.';

const runHook = () => {
    return renderHook(() => {
        return useRef<HTMLInputElement | null>(null);
    });
};

describe('<RegisterPermissionsTemplate /> component', () => {
    it('renders correctly', () => {
        const state = registerPermissionsInitialData;
        const {
            result: { current: ref },
        } = runHook();
        render(
            <HttpClientProvider>
                <PageRequesterProvider>
                    <InputRefProvider inputRef={ref}>
                        <RegisterPermissionsTemplate state={state}>
                            content
                        </RegisterPermissionsTemplate>
                    </InputRefProvider>
                </PageRequesterProvider>
            </HttpClientProvider>
        );
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
