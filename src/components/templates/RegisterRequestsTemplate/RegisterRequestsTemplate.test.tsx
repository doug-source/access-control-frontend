import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { registerRequestsInitialData } from '@/shared/utils/ReduceInitialValues';
import { render, renderHook, screen } from '@testing-library/react';
import { useRef } from 'react';
import { RegisterRequestsTemplate } from '.';

const runHook = () => {
    return renderHook(() => {
        return useRef<HTMLInputElement | null>(null);
    });
};

describe('<RegisterRequestsTemplate /> component', () => {
    it('renders correctly', () => {
        const state = registerRequestsInitialData('register-request', 0);
        const {
            result: { current: ref },
        } = runHook();

        render(
            <HttpClientProvider>
                <PageRequesterProvider>
                    <InputRefProvider inputRef={ref}>
                        <RegisterRequestsTemplate state={state}>
                            content
                        </RegisterRequestsTemplate>
                    </InputRefProvider>
                </PageRequesterProvider>
            </HttpClientProvider>
        );
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
