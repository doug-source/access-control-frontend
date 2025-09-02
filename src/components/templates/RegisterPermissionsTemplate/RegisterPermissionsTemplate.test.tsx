import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { InputRefProvider } from '@/shared/providers/InputRefProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import { groups } from '@/shared/utils/pagination';
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
        const state = registerPermissionsInitialData(1, groups[0]);
        const {
            result: { current: ref },
        } = runHook();
        render(
            <HttpClientProvider client={httpClientInstance}>
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
